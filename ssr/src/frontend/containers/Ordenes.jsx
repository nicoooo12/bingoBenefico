import React from 'react';
import { connect } from 'react-redux';

import HeaderB from '../components/Header-B';
import Header from '../components/Header';
// import Carton from '../components/Carton';
import Titulo from '../components/Title';
import Button from '../components/forms/Button';
import { Link } from 'react-router-dom';

import '../assets/styles/containers/Ordenes.scss';

const App = ({ user, history, enProgreso, terminadas, catalogo })=> {

  if (!user.id) {
    history.push('/');
  }

  console.log(enProgreso, terminadas);

  return (
    <>
      {
        !enProgreso.user ?
          terminadas[0] ?
            <HeaderB/> :
            <Header title='Mis ordenes' to='/'>
              <h1>No tienes<br/>ordenes</h1>
              <p>Que espera! ve y compra tus cartones para el bingo.</p>
              <Link to='/catalogo'>
                <Button>
                  Ir a comprar
                </Button>
              </Link>
            </Header> :
          <Header title='Mis ordenes' to='/'>
            <h1>Pedido<br/> en progreso</h1>
            <table className='bank__table'>
              <thead>
                <tr>
                  <th className='th__start'>Articulo</th>
                  <th className='th__end'>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {
                  enProgreso.compra.map((e, index)=>{
                    return (
                      <tr key={index}>
                        <td className='td__start'>{catalogo.filter((r)=>{return r.serie === e.serie;})[0].titulo}</td>
                        <td className='td__end'>{e.cantidad}</td>
                      </tr>
                    );
                  })
                }
                <tr>
                  <td> </td>
                  <td> </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className='td__start'>Pago total:</td>
                  <td className='td__end'>${enProgreso.totalPago}</td>
                </tr>
                <tr>
                  <td className='td__start'>Comprobante:</td>
                  <td className='td__end'>{enProgreso.canvasUrl ? 'si' : <Link to='/compra'><Button size='small' >Agregar</Button></Link>}</td>
                </tr>
                <tr>
                  <td className='td__start'>Estado:</td>
                  <td className='td__end'>{enProgreso.estado === 2 ? 'iniciada' : 'En revisión' }</td>
                </tr>
              </tfoot>
            </table>
            {
              enProgreso.message ?
                <div className='comentario'>
                  <h2>Comentario:</h2>
                  <p>{enProgreso.message}</p>
                </div> : <></>
            }
          </Header>
      }
      {
        terminadas[0] ?
          <div style={enProgreso.user ? { top: '800px', position: 'absolute' } : {}}>
            <Titulo title='Mis ordenes' />
            {
              terminadas.map((e, index)=>{
                return (
                  <div key={index} className='card'>
                    <h1>Pedido<br/> finalizado</h1>
                    <table className='bank__table'>
                      <thead>
                        <tr>
                          <th className='th__start'>Articulo</th>
                          <th className='th__end'>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          e.compra.map((e, index)=>{
                            return (
                              <tr key={index}>
                                <td className='td__start'>{catalogo.filter((r)=>{return r.serie === e.serie;})[0].titulo}</td>
                                <td className='td__end'>{e.cantidad}</td>
                              </tr>
                            );
                          })
                        }
                        <tr>
                          <td> </td>
                          <td> </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className='td__start'>Total a pagar:</td>
                          <td className='td__end'>${e.pago}</td>
                        </tr>
                        <tr>
                          <td className='td__start'>Total pagado:</td>
                          <td className='td__end'>${e.pagado}</td>
                        </tr>
                        <tr>
                          <td className='td__start'>Estado:</td>
                          <td className='td__end'>Finalizada</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>);
              })
            }
          </div> :
          <></>
      }
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
    enProgreso: state.ordenes.enProgreso,
    terminadas: state.ordenes.terminadas,
    catalogo: state.catalogos,
  };
};

const mapDispatchToProps = {
  // updateState,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
