import React from 'react';
// import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';

// import '../assets/styles/App.scss';
const App = (props)=> {

  return (
    <>
      <Header pag='/' />
      <h1>Home</h1>
      <Footer/>
    </>
  );
};


export default App;
