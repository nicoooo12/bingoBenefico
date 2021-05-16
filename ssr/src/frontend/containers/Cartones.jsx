import React from 'react';
import { connect } from 'react-redux';

import HeaderB from '../components/Header-B';
import Header from '../components/Header';
import Carton from '../components/Carton';
import Titulo from '../components/Title';
import Button from '../components/forms/Button';
import { Link } from 'react-router-dom';

const App = ({ user, history, cartones, catalogo })=> {

  if (!user.id) {
    history.push('/');
  }

  return (
    <>
      {
        cartones[0] ?
          <HeaderB/> :
          <Header title='Cartones' to='/' >
            <h1>No tienes cartones</h1>
            <p>Que espera! ve y compra tus cartones para el bingo.</p>
            <Link to='/catalogo'>
              <Button>
                Ir a comprar
              </Button>
            </Link>
          </Header>
      }
      {
        cartones[0] ?
          <>
            <Titulo title='Mis cartones' />
            {
              cartones.map((e, index)=>{
                return <Carton key={index} title={catalogo.filter((o)=>{return o.serie === e.serie;})[0].titulo} data={e.data} serie={e.serie} />;
              })
            }
          </> :
          <></>
      }
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
    cartones: state.cartonesUser,
    catalogo: state.catalogos,
  };
};

const mapDispatchToProps = {
  // updateState,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
