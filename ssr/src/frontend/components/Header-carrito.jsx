import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from './display/Icon';
import Card from './display/Card';
// import Carrito from './Carrito';
import { activeCarrito, desactiveCarrito } from '../actions';

import '../assets/styles/components/Header.scss';
// import Catalogo from '../containers/Catalogo';
const App = ({ title, icon, children, carrito, activeCarrito, desactiveCarrito, to })=> {

  const [focusHeader, setFocusHeader] = useState(true);
  let observer;
  const observerHandler = ()=>{
    observer = new IntersectionObserver((entry, observer)=>{
      if (entry[0].isIntersecting) {
        setFocusHeader(true);
      } else {
        setFocusHeader(false);
      }
    });
    observer.observe(document.querySelector('.header'));
  };
  useEffect(observerHandler, []);

  const carritoHandler = ()=>{
    // console.log('uwu', carrito.active);
    if (carrito.active) {
      desactiveCarrito();
    } else {
      if (carrito.data[0]) {
        activeCarrito();
      }
    }
  };

  let totalCarrito = 0;
  carrito.data.forEach((element) => {
    totalCarrito += (element.cantidad);
  });
  return (
    <>
      {
        focusHeader ?
          <>
            <div className='contentLibre-off'>
              {/* <div className='forwardIcon'>
                <Icon type='forward' width='24' height='24'/>
              </div> */}
              <h1>Bingoloteando</h1>
              {
                carrito.data[0] ?
                  <div className='lastIcon'>
                    <Icon type={icon} width='24' height='24'/>
                  </div> : <div> </div>
              }
            </div>
          </> :
          <>
            <div className='contentLibre'>
              {
                carrito.active ?
                  <div className='forwardIcon' onClick={carritoHandler} >
                    <Icon type='forward' width='24' height='24'/>
                  </div> :
                  <Link to={to} >
                    <div className='forwardIcon'>
                      <Icon type='forward' width='24' height='24'/>
                    </div>
                  </Link>
              }
              <h1>Bingoloteando</h1>
              {
                carrito.data[0] ?
                  <div className='lastIcon' onClick={carritoHandler}>
                    <Icon type={icon} width='24' height='24'/>
                    { carrito.data[0] ? <div className='bubble'>{totalCarrito}</div> : false }
                  </div> : <div> </div>
              }
            </div>
          </>
      }
      <header className={carrito.active ? 'disNone' : ''}>
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
              carrito.data[0] ?
                <div className='lastIcon' onClick={carritoHandler}>
                  <Icon type={icon} width='24' height='24'/>
                  { carrito.data[0] ? <div className='bubble'>{totalCarrito}</div> : false }
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

const mapStateToProps = (state)=>{
  return {
    carrito: state.carrito,
  };
};

const mapDispatchToProps = {
  activeCarrito,
  desactiveCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
