import React, { useState } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header-A';
import Footer from '../components/Footer';
import Carrusel from '../components/Carrusel';
import RegisterPanel from '../components/RegisterPanel';

import Img1 from '../assets/images/1.png';

// import '../assets/styles/App.scss';
const App = ({ user })=> {

  const [menu, setMenu] = useState(false);

  const menuHandler = ()=>{
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  return (
    <>
      <Header pag='/' menu={menuHandler}/>
      {
        menu ?
          <div>
            <h1>Menu</h1>
            <ul>
              <li>Cuenta</li>
              <li>Reglas del bingo</li>
              <li>Mis cartones</li>
              <li>Comprar</li>
              <li>Salir de mi cuenta</li>
            </ul>
          </div> :
          <>
            {
              !user.id && <RegisterPanel />
            }
            <Carrusel
              image={[
                { img: Img1, title: '¿A qué causa estoy apoyando ?', sub: 'Enterate!', btnText: 'Aquí!', redirect: '/' },
                { img: Img1, title: '¿Necesitas ayuda?', sub: 'Estamos aquí para ayudarte...', btnText: 'Ayuda!', redirect: '/help' },
                { img: Img1, title: 'Compra un carton.', sub: 'Compra tus cartones', btnText: 'Comprar', redirect: '/catalogo' },
              ]}
            />
          </>
      }
      <Footer/>
    </>
  );
};

const mapSateToProps = (state)=>{
  return {
    user: state.user,
  };
};

export default connect(mapSateToProps)(App);
