import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from './display/Icon';

import '../assets/styles/components/Header.scss';
const App = ()=> {

  return (
    <header className='headerA'>
      <div className='contentLibreB' >
        <div className='forwardIcon' onClick={()=>{history.back();}}>
          <Icon type='forward' width='24' height='24'/>
        </div>
        <Link to='/' >
          <h1>Bingoloteando</h1>
        </Link>
        <div> </div>
      </div>
    </header>
  );

};

export default App;
