import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../assets/styles/components/Header.scss';
const App = (props)=> {
  const { pag, user } = props;
  return (
    <header className='header'>
      <div className='header__content'>
        <div className='header__title'>
          <Link to='/'>
            <h1 className='header__title' >Bingoloteando</h1>
          </Link>
        </div>
        <nav className='header__nav'>
          <ul>
            <li>
              <Link to='/'>
                {
                  pag === '/' ? <button tabIndex='-1' className='header__pag-active'>Inicio</button> : <button tabIndex='-1' className='header__pag'>Inicio</button>
                }
              </Link>
            </li>
            <li>
              <Link to='/play'>
                {
                  pag === '/play' ? <button tabIndex='-1' className='header__pag-active'>Jugar</button> : <button tabIndex='-1' className='header__pag'>Jugar</button>
                }
              </Link>
            </li>
            <li>
              <Link to='/catalogo'>
                {
                  pag === '/catalogo' ? <button tabIndex='-1' className='header__pag-active'>Comprar</button> : <button tabIndex='-1' className='header__pag'>Comprar</button>
                }
              </Link>
            </li>
          </ul>
        </nav>
        <div className='header__buttonGroup'>
          { !user.userName ?
            <>
              <h1 key='1'>{user.userName}</h1>
            </> :
            <ul>
              <li>
                <Link to='/sign-in'>
                  <button tabIndex='-1' className='header__buttonItem-signIn'>
                    Ingresar
                  </button>
                </Link>
              </li>
              <li>
                <Link to='/sign-up'>
                  <button tabIndex='-1' className='header__buttonItem-signUp'>
                    Crear una cuenta
                  </button>
                </Link>
              </li>
            </ul> }
        </div>
      </div>
    </header>
  );

};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
