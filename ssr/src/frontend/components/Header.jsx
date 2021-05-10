import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Icon from './display/Icon';
import Card from './display/Card';

import '../assets/styles/components/Header.scss';
const App = ({ title, icon, children })=> {

  const [focusHeader, setFocusHeader] = useState(true);
  let observer;
  useEffect(()=>{
    observer = new IntersectionObserver((entry, observer)=>{
      if (entry[0].isIntersecting) {
        setFocusHeader(true);
      } else {
        setFocusHeader(false);
      }
    });
    observer.observe(document.querySelector('.header'));
  }, [observer]);

  return (
    <>
      {
        focusHeader ?
          <>
            <div className='contentLibre-off'>
              <div className='forwardIcon'>
                <Icon type='forward' width='24' height='24'/>
              </div>
              <h1>Bingoloteando</h1>
              {
                icon ?
                  <div className='lastIcon'>
                    <Icon type={icon} width='24' height='24'/>
                  </div> : false
              }
            </div>
          </> :
          <>
            <div className='contentLibre'>
              <div className='forwardIcon'>
                <Icon type='forward' width='24' height='24'/>
              </div>
              <h1>Bingoloteando</h1>
              {
                icon ?
                  <div className='lastIcon'>
                    <Icon type={icon} width='24' height='24'/>
                  </div> : false
              }
            </div>
          </>
      }
      <header >
        <div className='header'>
          <div className='banner'> </div>
          <div className='content'>
            <div className='forwardIcon'>
              <Icon type='forward' width='24' height='24'/>
            </div>
            <h1>Bingoloteando</h1>
            {
              icon ?
                <div className='lastIcon'>
                  <Icon type={icon} width='24' height='24'/>
                </div> : false
            }
          </div>
          <div className='info'>
            <h1>{title}</h1>
            <Card>
              {
                children
              }
            </Card>
          </div>
        </div>
      </header>
    </>
  );

};

export default App;
