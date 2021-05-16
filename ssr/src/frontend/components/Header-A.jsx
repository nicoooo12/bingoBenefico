import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from './display/Icon';

import '../assets/styles/components/Header.scss';
const App = ({ p, menu })=> {

  return (
    <header className='headerA'>
      <div className='contentLibreA'>
        <Link to='/' onClick={p}>
          <h1>Bingoloteando</h1>
        </Link>
        <div className='lastIcon' onClick={menu}>
          <Icon type='list' width='24' height='24'/>
        </div>
      </div>
    </header>
  );

};

export default App;
