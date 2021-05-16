import React, { useState } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header-A';
import Footer from '../components/Footer';
import Carrusel from '../components/Carrusel';
import ButtonIcon from '../components/forms/ButtonIcon';
import RegisterPanel from '../components/RegisterPanel';
import { updateState } from '../actions';
import { Link } from 'react-router-dom';

import Img1 from '../assets/images/1.png';

import '../assets/styles/containers/menu.scss';
const App = ({ user, updateState })=> {

  const [menu, setMenu] = useState(false);

  const menuHandler = ()=>{
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  const logoutHandler = ()=>{
    console.log('oli');
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    updateState();
    setMenu(false);
  };

  return (
    <>
      <Header pag='/' p={()=>{setMenu(false);}} menu={menuHandler}/>
      {
        menu ?
          <div className='menu'>
            <h1>Menu</h1>
            <ul>
              {
                user.id ?
                  <>
                    {/* <li>
                      Cuenta
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/cuenta'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li> */}
                    <li>
                      Jugar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/play'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Comprar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/catalogo'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div></li>
                    <li>
                      Mis cartones
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/cartones'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Mis ordenes
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/ordenes'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Ayuda
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/help'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div></li>
                    <li>
                      Salir de mi cuenta
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <ButtonIcon size='small' typebutton='subtle' onClick={logoutHandler} />
                      </div>
                    </li>
                  </> :
                  <>
                    <li>
                      Ingresar
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/sign-in'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Registrarme
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/sign-up'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div>
                    </li>
                    <li>
                      Ayuda
                      <div style={{ transform: 'rotate(180deg)' }}>
                        <Link to='/help'>
                          <ButtonIcon size='small' typebutton='subtle' />
                        </Link>
                      </div></li>
                  </>
              }
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

const mapDispatchToProps = {
  updateState,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
