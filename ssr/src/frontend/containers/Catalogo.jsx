import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header-carrito';
import ButtonIcon from '../components/forms/ButtonIcon';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import Title from '../components/Title';
// import Section from '../components/Section';
import Tarjeta from '../components/Tarjetas';
import Carrito from '../components/Carrito';
// import Carrito from '../components/Carrito';
// import { Link } from 'react-router-dom';

const App = ({ catalogos, carrito, history })=> {

  const clickHandler = ()=>{
    document.querySelector('#react').scrollTo(0, document.querySelector('header').offsetHeight);
  };

  return (
    <>
      <Header to='/' title='Compras' icon='trolley'>
        <h1>¡Apoya con tu compra para este bingo!</h1>
        <p>Comprando estos bingos estarás apoyando la recaudación de fondos del Centro Mariápolis. Solo añade a tu carrito los cartones de los bingos que quieras jugar y cuando estés list@ para pagar, presiona “¡Pagar todo!”.</p>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <ButtonIcon onClick={clickHandler}/>
        </div>
      </Header>
      <MainContent>
        {
          !carrito.active ?
            <>
              <Title title='Catalogo'/>
              {catalogos.map(
                (item, index)=>
                  (
                    <Tarjeta
                      key={index}
                      title={item.titulo}
                      subTitle={item.subTitulo}
                      precio={item.precio}
                      serie={item.serie}
                      premios={item.premios.map((e, i)=>i === 0 ? `${e.nombre} ` : `~ ${e.nombre}`)}
                    />
                  ),
              )}
            </> :
            <Carrito history={history}/>
        }
      </MainContent>
      {
        !carrito.active ?
          <Footer/> : <></>
      }
    </>
  );

};

const mapDispatchToProps = (state)=>{
  return {
    carrito: state.carrito,
    catalogos: state.catalogos,
  };
};

export default connect(mapDispatchToProps)(App);
