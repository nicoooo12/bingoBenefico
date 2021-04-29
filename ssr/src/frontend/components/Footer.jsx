import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/components/Footer.scss';

const App = ()=> {

  return (
    <footer>
      <div className='footer__content'>
        <h1 className='footer__title'>Bingolote<span className='subrayado' >ando</span></h1>
        <div className='footer__list'>
          <ul>
            <li>
              <Link to='/'>
                <button tabIndex='-1'>
                  Ayuda
                </button>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <button tabIndex='-1'>
                  Contacto
                </button>
              </Link>
            </li>
            <li>
              <Link to='/'>
                <button tabIndex='-1'>
                  Evento
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );

};

export default App;
