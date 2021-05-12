import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Pageination from '../components/forms/Pageination';
import { statusNextCarrito, setStatusCarrito } from '../actions';
import Button from '../components/forms/Button';
// import Footer from '../components/Footer';
// import MainContent from '../components/MainContent';
// import Title from '../components/Title';
// import Section from '../components/Section';
// import Tarjeta from '../components/Tarjetas';
// import Carrito from '../components/Carrito';
// import Carrito from '../components/Carrito';
// import { Link } from 'react-router-dom';
import '../assets/styles/containers/Compra.scss';

const App = ({ catalogos, carrito, setStatusCarrito, statusNextCarrito })=> {

  const nextHandler = (num)=>{
    if (num || num === 0) {
      setStatusCarrito(num + 1);
    } else {
      statusNextCarrito();
    }
  };

  const startPay = ()=>{
    statusNextCarrito();
  };

  let contentHeader;
  console.log(carrito);
  switch (carrito.state) {
    case 0:
      contentHeader = (<>
        <h1>Pago con Transferencia.</h1>
        <p>Para realizar el pago deberá realizar una transferencia electrónica (Datos de la transacción se presentarán a continuación) y posteriormente mandarnos un comprobante de esta transacción. Sus cartones sólo serán liberados una vez que nos envíe este comprobante.</p>
        <Button onClick={startPay}>Iniciar Pago</Button>
      </>);
      break;
    case 1:
      contentHeader = (<>
        <h1>Datos bancarios.</h1>
        <p>Para realizar el pago deberá realizar una transferencia electrónica (Datos de la transacción se presentarán a continuación) y posteriormente mandarnos un comprobante de esta transacción. Sus cartones sólo serán liberados una vez que nos envíe este comprobante.</p>
        <Pageination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={0} nextHandler={nextHandler} />
      </>);
      break;
    case 2:
      contentHeader = (<>
        <h1>Subir Comprobante.</h1>
        <p>Para realizar el pago deberá realizar una transferencia electrónica (Datos de la transacción se presentarán a continuación) y posteriormente mandarnos un comprobante de esta transacción. Sus cartones sólo serán liberados una vez que nos envíe este comprobante.</p>
        <Pageination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={1} nextHandler={nextHandler} />
      </>);
      break;
    default:
      contentHeader = (<>
        <h1>Error.</h1>
        <p>hola mnd</p>
      </>);
      break;
  };

  return (
    <div className='compras'>
      <Header title='Pagar' to='catalogo' >
        {contentHeader}
      </Header>
      {/* <Footer/> */}
    </div>
  );

};

const mapStateToProps = (state)=>{
  return {
    carrito: state.carrito,
    // catalogos: state.catalogos,
  };
};

const mapDispatchToProps = {
  statusNextCarrito,
  setStatusCarrito,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
