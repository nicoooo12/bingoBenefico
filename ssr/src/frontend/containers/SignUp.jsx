import React, { useState } from 'react';
import { connect } from 'react-redux';

import { singUp, setRedirect } from '../actions';
import Header from '../components/Header-B';
import Title from '../components/Title';
// import Content from '../components/Content';
// import Section from '../components/Section';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
// import MainContent from '../components/MainContent';
// import Footer from '../components/Footer';

import '../assets/styles/containers/signIn-up.scss';

const App = ({ singUp, history, redirect, setRedirect })=> {

  const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
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
      console.log(err.request);
      console.log(JSON.parse(err.request.response));
      const req = JSON.parse(err.request.response);
      console.log(err.request.status, req.message, req.message === 'busy account');
      switch (err.request.status) {
        case 400:
          req.message === 'busy account' ?
            setErrComponent(<h1>Esta cuenta ya esta ocupada, por favor intenta otra.</h1>) :
            setErrComponent(<h1>Rellene los parámetros correctamente.</h1>);
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
      <Title title='Registrarme' />
      <form onSubmit={handleSubmit} className='form'>
        {errComponent}
        <Input type='text' placeholder='Nombre de usuario' name='name' onChange={updateInput}/>
        <Input type='text' placeholder='Email' name='email' onChange={updateInput}/>
        <Input type='password' autoComplete='false' placeholder='Contraseña' name='password' onChange={updateInput} current-password />
        <p>
          Ya tienes cuenta ? Ingresa <Button onClick={()=>{history.push('/sign-in');}} typebutton='text' >Aquí</Button>
        </p>
        <Button type='submit' >Iniciar sesión</Button>
      </form>
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
