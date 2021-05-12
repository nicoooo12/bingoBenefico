import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from './display/Icon';

import '../assets/styles/components/Header.scss';
const App = ({ icon, to })=> {

  return (
    <>
      <div className='contentLibre'>
        <Link to={to} >
          <div className='forwardIcon'>
            <Icon type='forward' width='24' height='24'/>
          </div>
        </Link>
        <h1>Bingoloteando</h1>
        {
          icon ?
            <div className='lastIcon'>
              <Icon type={icon} width='24' height='24'/>
            </div> : <div> </div>
        }
      </div>
    </>
  );

};

export default App;
