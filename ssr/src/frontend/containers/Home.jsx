import React from 'react';
// import { connect } from 'react-redux';

import Header from '../components/Header-A';
import Footer from '../components/Footer';
import Carrusel from '../components/Carrusel';

// import Img1 from '../assets/images/1.png';

// import '../assets/styles/App.scss';
const App = (props)=> {

  return (
    <>
      <Header pag='/' />
      <Carrusel
        image={[
          { img: Img1, title: '¿A qué causa estoy apoyando ?', sub: 'Enterate!', btnText: 'Aquí!', redirect: '/' },
          { img: Img1, title: '¿Necesitas ayuda?', sub: 'Estamos aquí para ayudarte...', btnText: 'Ayuda!', redirect: '/help' },
          { img: Img1, title: 'Compra un carton.', sub: 'Compra tus cartones', btnText: 'Comprar', redirect: '/catalogo' },
        ]}
      />
      {/* <img src={Img1} /> */}
      <Footer/>
    </>
  );
};

export default App;
