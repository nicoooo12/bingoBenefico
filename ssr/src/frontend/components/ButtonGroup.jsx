import React from 'react';
import { connect } from 'react-redux';

import '../assets/styles/components/ButtonGroup.scss';
const App = (props)=> {

  return (
    <div className='buttonGroup'>
      {
        props.carrito.filter((e)=>e.serie === props.serie)[0] ?
          <>
            <button className='buttonGroup__buttonAction' onClick={()=> props.remove()}>-</button>
            <span>{props.carrito.filter((e)=>e.serie === props.serie)[0].cantidad}</span>
            <button className='buttonGroup__buttonAction' onClick={()=> props.add()}>+</button>
          </> : <button className='buttonGroup__buttonComprar' onClick={()=> props.add()}>Añadir Al carrito</button>
      }
    </div>
  );

};

const mapDispatchToProps = (dispatch, props)=>{
  return {
    add: () => dispatch({ type: 'ADD_ITEM_TO_CARRITO', payload: { serie: props.serie, title: props.title, precio: props.precio } }),
    remove: () => dispatch({ type: 'REMOVE_ITEM_TO_CARRITO', payload: { serie: props.serie, title: props.title, precio: props.precio } }),
  };
};

const mapStateToProps = (state, props) => {
  return {
    props,
    carrito: state.carrito.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
