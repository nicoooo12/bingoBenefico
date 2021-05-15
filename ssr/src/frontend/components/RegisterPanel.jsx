import React from 'react';

import Button from '../components/forms/Button';
import { Link } from 'react-router-dom';

import '../assets/styles/components/RegisterPanel.scss';

const App = ()=> {

  return (
    <>
      <div className='panel'>
        <h1>Bienvenido</h1>
        <p>Para comprar tus cartones y poder jugar debes crear una cuenta. No te tardará más de un minuto ;)</p>
        <Link to='sign-up'>
          <Button size='small' >Registrarme</Button>
        </Link>
        <small>o si ya tienes una cuenta</small>
        <Link to='sign-in'>
          <Button size='small' typebutton='subtle'>Ingresar</Button>
        </Link>
      </div>
    </>
  );

};

export default App;
