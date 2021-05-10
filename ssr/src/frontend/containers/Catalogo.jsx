import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import ButtonIcon from '../components/forms/ButtonIcon';
// import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import Title from '../components/Title';
// import Section from '../components/Section';
import Tarjeta from '../components/Tarjetas';
// import Carrito from '../components/Carrito';
// import { Link } from 'react-router-dom';

const App = ({ catalogos })=> {

  const clickHandler = ()=>{
    document.querySelector('#react').scrollTo(0, document.querySelector('header').offsetHeight);
  };

  return (
    <>
      <Header title='Compras' icon='trolley'>
        <h1>¡Apoya con tu compra para este bingo!</h1>
        <p>Comprando estos bingos estarás apoyando la recaudación de fondos del Centro Mariápolis. Solo añade a tu carrito los cartones de los bingos que quieras jugar y cuando estés list@ para pagar, presiona “¡Pagar todo!”.</p>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <ButtonIcon onClick={clickHandler}/>
        </div>
      </Header>
      <MainContent>
        <Title title='Catalogo'/>
        {
          catalogos.map(
            (item, index)=>
              (
                <Tarjeta
                  key={index}
                  title={item.title}
                  subTitle={item.subTitle}
                  precio={item.precio}
                  serie={item.serie}
                  premios={item.premios.map((e, i)=>i === 0 ? `${e.nombre} ` : `~ ${e.nombre}`)}
                />
              ),
          )
        }
      </MainContent>
      {/* <Footer/> */}
    </>
  );

};

const mapDispatchToProps = (state)=>{
  return {
    catalogos: state.catalogos,
  };
};

export default connect(mapDispatchToProps)(App);
