import React from 'react';
import { connect } from 'react-redux';
import Button from './forms/IncrementStepper';
import Badges from './display/Badges';

import { addItemToCarrito, removeItemToCarrito } from '../actions';

import '../assets/styles/components/Tarjetas.scss';
const App = ({ title, subTitle, precio, serie, premios, addItemToCarrito, removeItemToCarrito, carrito })=> {

  const addCarritoHandle = (serie, cantidad)=>{
    addItemToCarrito({ serie, title, precio: precio });
  };

  const subtractCarritoHandle = (serie, cantidad)=>{
    removeItemToCarrito({ serie, title, precio: precio });
  };

  return (
    <div className='tarjeta'>
      <div className='tarjeta__content'>
        <h1 className='tarjeta__title'>{title}</h1>
        <div className='tarjeta__premios'>
          <small>
            { premios }
          </small>
        </div>
        <p className='tarjeta__subTitle'>{subTitle}</p>
        <div className='tarjeta__componentsGroup'>
          <Button disabledButton={!!carrito.state >= 1} idHandler={serie} setStartCount={carrito.data.filter((e)=>{return e.serie === serie;})[0] ? carrito.data.filter((e)=>{return e.serie === serie;})[0].cantidad : 0} handlerAdd={addCarritoHandle} handlerSubtract={subtractCarritoHandle} />
          <Badges>{'$' + precio + ' CLP'}</Badges>
        </div>
      </div>
    </div>
  );

};

const mapStateToProps = (state)=>{

  return {
    carrito: state.carrito,
  };

};
const mapDispatchToProps = {
  addItemToCarrito,
  removeItemToCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
