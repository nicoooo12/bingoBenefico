import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Pageination from '../components/forms/Pageination';
import { statusNextCarrito, setStatusCarrito, setRedirect, createOrden, createCanvasOrden } from '../actions';
import Button from '../components/forms/Button';
import Icon from '../components/display/Icon';
import Footer from '../components/Footer';
// import MainContent from '../components/MainContent';
// import Title from '../components/Title';
import Auth from './SignIn';
// import Tarjeta from '../components/Tarjetas';
// import Carrito from '../components/Carrito';
// import Carrito from '../components/Carrito';
// import { Link } from 'react-router-dom';
import '../assets/styles/containers/Compra.scss';

const App = ({ misOrdenes, history, createCanvasOrden, createOrden, user, carrito, setStatusCarrito, statusNextCarrito, setRedirect })=> {

  const inputImg = useRef('');
  const canvasImg = useRef('');
  const Img = useRef('');
  const [data, setData] = useState('');
  const nextHandler = (num)=>{
    if (num || num === 0) {
      setStatusCarrito(num + 1);
    } else {
      statusNextCarrito();
    }
  };

  const startPay = ()=>{
    if (!misOrdenes.user) {
      console.log('[startPay]');
      let totalPago = 0;
      const carro = carrito.data.map((e)=>{
        totalPago += (e.precio * e.cantidad);
        return { serie: e.serie, cantidad: e.cantidad };
      });
      createOrden(carro, totalPago);
    }
  };

  const endHandler = ()=>{
    createCanvasOrden(data, ()=>{
      // console.log('redirect!');
      history.push('/ordenes');
    }, (err)=>{
      console.log(err);
    });
  };

  const handleOnLoad = ()=>{
    setRedirect('');
  };

  const handleImg = ()=>{

    const imageLoaded = ()=>{

      // let CanvasHeight;
      // let CanvasWidth;

      // if (window.outerWidth <= 425) {
      //   CanvasHeight = 500;
      //   CanvasWidth = 300;
      // } else {
      //   CanvasHeight = 300;
      //   CanvasWidth = 500;
      // }
      const resto = 20;
      canvasImg.current.width = ((img.width * resto) / 100);
      canvasImg.current.height = ((img.height * resto) / 100);

      const ctx = canvasImg.current.getContext('2d');
      ctx.drawImage(img, 0, 0, ((img.width * resto) / 100), (((img.height * resto) / 100)));
      const urlA = canvasImg.current.toDataURL('image/jpeg', 0.7);
      console.log('length::', urlA.length);
      setData(urlA);
      Img.current.src = urlA;
      if (urlA.length > 100000) {
        // let resto = urlA.length - 100000;
        // console.log('resto::', resto);
        // canvas.width = (resto);
        // canvas.height = (resto);
        // ctx.drawImage(img,0,0, (resto),(resto));
        // let url = canvas.toDataURL('image/jpeg', 1)  // get the data URL
        // console.log(url.length);
        // console.log(url);
      }
    };

    const createImage = ()=>{
      console.log('create');
      img = new Image();
      img.onload = imageLoaded;
      img.src = fr.result;
    };

    console.log(inputImg);
    console.log(inputImg.current.files);
    const file = inputImg.current.files[0];
    const fr = new FileReader();
    let img;
    fr.onload = createImage;
    fr.readAsDataURL(file);

    console.log(fr);

  };

  let contentHeader;
  // console.log(carrito);
  switch (carrito.state) {
    case 0:
      if (!carrito.data[0]) {
        history.push('/catalogo');
      }
      contentHeader = (<>
        <h1>Pago con Transferencia.</h1>
        <p>Para realizar el pago deberá realizar una transferencia electrónica (Datos de la transacción se presentarán a continuación) y posteriormente mandarnos un comprobante de esta transacción. Sus cartones sólo serán liberados una vez que nos envíe este comprobante.</p>
        <Button onClick={statusNextCarrito}>Iniciar Pago</Button>
      </>);
      break;
    case 1:
      contentHeader = (<>
        <h1>Datos<br/>bancarios.</h1>
        { startPay() }
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
        <Pageination content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={0} nextHandler={nextHandler} />
      </>);
      break;
    case 2:
      contentHeader = (<>
        <h1>Subir<br/>Comprobante.</h1>
        <div className='subirArchivo'>
          <input
            type='file'
            id='file'
            style={{ opacity: 0 }}
            ref={inputImg}
            accept='image/png, image/jpeg'
            onChange={handleImg}
          />
          <label htmlFor='file'>
            { console.log('[input]', inputImg, inputImg.current !== null) }
            { inputImg.current !== null && inputImg.current.files ?
              <>
                <img ref={Img} />
                <p>Nos atrapaste! Tuvimos que reducir la calidad de la imagen... Revisa que se vea bien y presiona Finalizar</p>
              </> :
              <>
                <img ref={Img} />
                <div>
                  <Icon type='upLoad' />
                  Subir Archivo
                </div>
              </>
            }
          </label>
        </div>
        <Pageination disabled={inputImg.current !== null && !inputImg.current.files} content={['Datos bancarios.', 'Subir Comprobante.']} btn={true} pag={1} nextHandler={nextHandler} end={endHandler} />
      </>);
      break;
    default:
      contentHeader = (<>
        <h1>Error.</h1>
        <p> </p>
      </>);
      break;
  };

  return (
    <>
      {
        carrito.state >= 1 & !user.id ?
          <Auth history={history} notRedirect /> :
          <div className='compras' onLoad={handleOnLoad}>
            <Header title='Pagar' to='catalogo' >
              <canvas id='canvas' ref={canvasImg} style={{ display: 'none' }}> </canvas>
              {contentHeader}
            </Header>
            <Footer/>
          </div>
      }
    </>
  );

};

const mapStateToProps = (state)=>{
  return {
    carrito: state.carrito,
    user: state.user,
    misOrdenes: state.ordenes.enProgreso,
    // state: state,
    // catalogos: state.catalogos,
  };
};

const mapDispatchToProps = {
  createOrden,
  statusNextCarrito,
  setStatusCarrito,
  setRedirect,
  createCanvasOrden,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
