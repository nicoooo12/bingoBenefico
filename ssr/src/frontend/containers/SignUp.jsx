import React, { useState } from 'react';
import { connect } from 'react-redux';

import { singUp, setRedirect } from '../actions';
import Header from '../components/Header-A';
import Title from '../components/Title';
// import Content from '../components/Content';
// import Section from '../components/Section';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import MainContent from '../components/MainContent';
// import Footer from '../components/Footer';

const App = ({ singUp, history, redirect, setRedirect })=> {

  const [form, setValues] = useState({
    email: '',
    name: '',
    passport: '',
  });

  const [errComponent, setErrComponent] = useState(<></>);

  const updateInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    singUp(form, ()=>{
      if (redirect) {
        history.push(redirect);
      } else {
        history.push('/');
      }
    }, (err)=>{
      // console.log(err.request.status);
      switch (err.request.status) {
        case 401:
          setErrComponent(<h1>Usuario y/o contraseña incorrecto</h1>);
          break;
        default:
          setErrComponent(<h1>Lo sentimos, hubo un error interno. Intentalo más tarde.</h1>);
          break;
      }
    });
  };

  return (
    <>
      <Header/>
      <MainContent>
        <Title title='Ingresar' />
        <br/>
        <form onSubmit={handleSubmit}>
          {errComponent}
          <Input type='text' placeholder='Nombre de usuario' name='name' onChange={updateInput}/>
          <Input type='text' placeholder='Email' name='email' onChange={updateInput}/>
          <Input type='password' autoComplete='false' placeholder='Contraseña' name='password' onChange={updateInput} current-password />
          <Button type='submit' >Iniciar sesión</Button>
        </form>
        <br/>
      </MainContent>
      {/* <Footer/> */}
    </>
  );

};

const mapSateToProps = (state)=>{
  return {
    redirect: state.redirect,
  };
};

const mapDispatchToProps = {
  singUp,
  setRedirect,
};

export default connect(mapSateToProps, mapDispatchToProps)(App);
