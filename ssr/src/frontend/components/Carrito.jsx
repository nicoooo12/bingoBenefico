import React from 'react';
import { connect } from 'react-redux';

import Buttons from './ButtonGroup';
import '../assets/styles/components/Carrito.scss';
const App = ({ carrito, active, ...props })=> {

  let totalCarrito = 0;
  let totalPrecio = 0;
  carrito.forEach((element) => {
    totalCarrito += (element.cantidad);
    totalPrecio += (element.precio * element.cantidad);
  });

  const click = (e)=>{
    if (
      !e.path.filter((e)=> e === document.getElementsByClassName('carrito__factura')[0])[0] &&
      !e.path.filter((e)=> e === document.getElementsByClassName('carrito__button')[0])[0]
    ) {
      document.addEventListener('click', click);props.desactive();
    }
  };

  return (
    <>
      <div className='carrito'>
        <button className='carrito__button' onClick={()=>{document.addEventListener('click', click); props.activefn();}}>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-cart-fill' viewBox='0 0 16 16'>
            <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'/>
          </svg>
          &nbsp;
          {totalCarrito}
        </button>
        { active && (
          <div className='carrito__factura'>
            <div className='carrito__header'>
              <h1>Carrito de compras</h1>
              <button onClick={()=>{document.addEventListener('click', click);props.desactive();}}>
                <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='currentColor' className='bi bi-x' viewBox='0 0 16 16'>
                  <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/>
                </svg>
              </button>
            </div>
            <div className='carrito__tableContent'>
              <table className='carrito__table'>
                <thead>
                  <tr>
                    <th className='th__title'>Articulo</th>
                    <th className='th__button'>Cantidad</th>
                    <th className='th__precio'>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((e, index)=>{
                    return (
                      <tr key={index}>
                        <td className='td__title'>{e.title}</td>
                        <td className='td__button'>
                          <Buttons title={e.title} serie={e.serie} precio={e.precio} />
                        </td>
                        <td className='td__precio'>${e.precio}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td className='td__title'>Total</td>
                    <td className='td__button'>{totalCarrito}</td>
                    <td className='td__precio'>${totalPrecio}</td>
                  </tr>
                </tfoot>
              </table>
              <button className='carrito__btnPagar' onClick={()=>{document.addEventListener('click', click);props.desactive();}} >Pagar ${totalPrecio}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );

};

const mapDispatchToProps = (dispatch)=>{
  return {
    activefn: () => {
      dispatch({ type: 'ACTIVE_CARRITO' });
    },
    desactive: () => {
      dispatch({ type: 'DESACTIVE_CARRITO' });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    carrito: state.carrito.data,
    active: state.carrito.active,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
