import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import Title from '../components/Title';
import Section from '../components/Section';
import Tarjeta from '../components/Tarjetas';
import Carrito from '../components/Carrito';

// import '../assets/styles/App.scss';
const App = ({ catalogos, carrito })=> {

  return (
    <>
      <Header pag='/catalogo' />
      <MainContent>
        <Title title='Compras'>
          {
            carrito.length > 0 &&
            <Carrito />
          }
        </Title>
        <Section>

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

        </Section>
      </MainContent>
      <Footer/>
    </>
  );

};

const mapStateToProps = (state) => {
  return {
    catalogos: state.catalogos,
    carrito: state.carrito.data,
  };
};

export default connect(mapStateToProps)(App);
