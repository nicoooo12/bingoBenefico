import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from './display/Icon';
import Card from './display/Card';

import '../assets/styles/components/Header.scss';
const App = ({ title, icon, children, to })=> {

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
              {/* <Link to={to} >
                <div className='forwardIcon'>
                  <Icon type='forward' width='24' height='24'/>
                </div>
              </Link> */}
              <h1>Bingoloteando</h1>
              {
                icon ?
                  <div className='lastIcon'>
                    <Icon type={icon} width='24' height='24'/>
                  </div> : <div> </div>
              }
            </div>
          </> :
          <>
            <div className='contentLibre'>
              <Link to={to} >
                <div className='forwardIcon'>
                  <Icon type='forward' width='24' height='24'/>
                </div>
              </Link>
              <h1>Bingoloteando</h1>
              {
                icon ?
                  <div className='lastIcon'>
                    <Icon type={icon} width='24' height='24'/>
                  </div> : <div> </div>
              }
            </div>
          </>
      }
      <header className='headerMain'>
        <div className='header'>
          <div className='banner'> </div>
          <div className='content'>
            <Link to={to} >
              <div className='forwardIcon'>
                <Icon type='forward' width='24' height='24'/>
              </div>
            </Link>
            <h1>Bingoloteando</h1>
            {
              icon ?
                <div className='lastIcon'>
                  <Icon type={icon} width='24' height='24'/>
                </div> : <div> </div>
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
