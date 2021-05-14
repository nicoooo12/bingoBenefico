import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Pageination from '../components/forms/Pageination';
import { statusNextCarrito, setStatusCarrito, setRedirect } from '../actions';
import Button from '../components/forms/Button';
import Footer from '../components/Footer';
// import MainContent from '../components/MainContent';
// import Title from '../components/Title';
// import Auth from './SignIn';
// import Tarjeta from '../components/Tarjetas';
// import Carrito from '../components/Carrito';
// import Carrito from '../components/Carrito';
// import { Link } from 'react-router-dom';
import '../assets/styles/containers/Compra.scss';

const App = ({ isLogged, history, catalogos, carrito, setStatusCarrito, statusNextCarrito, setRedirect })=> {

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

  const handleOnLoad = ()=>{
    setRedirect('');
  };

  let contentHeader;
  // console.log(carrito);
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
        <h1>Datos<br/>bancarios.</h1>
        <p>
          <table className='bank__table'>
            <thead>
              {/* <tr>
                <th className='th__start'>Correo </th>
                <th className='th__end'>example@example.com</th>
              </tr> */}
            </thead>
            <tbody>
              <tr>
                <td className='td__start'>Numero de cuenta:</td>
                <td className='td__end'>12-34567-89</td>
              </tr>
              <tr>
                <td className='td__start'>Rut:</td>
                <td className='td__end'>12.345.678-9</td>
              </tr>
              <tr>
                <td className='td__start'>Titular:</td>
                <td className='td__end'>Example name</td>
              </tr>
              <tr>
                <td className='td__start'>Banco:</td>
                <td className='td__end'>Bank name</td>
              </tr>
              {/* <tr>
                <td className='td__start'>Comentario en la transferencia (Poner en el espacio de comentario)</td>
                <td className='td__end'>Pago de cartones Bingoloteando, [Nombre] pago $[monto]</td>
              </tr> */}
            </tbody>
            <tfoot>
              <tr>
                <td className='td__start'>Monto a Pagar: </td>
                <td className='td__end'>$10000</td>
              </tr>
            </tfoot>
          </table>
        </p>
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
    <>
      {
        isLogged ?
          <div className='compras' onLoad={handleOnLoad}>
            <Header title='Pagar' to='catalogo' >
              {contentHeader}
            </Header>
            <Footer/>
          </div> :
          <></>
          // <Auth history={history} />
      }
    </>
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
  setRedirect,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
