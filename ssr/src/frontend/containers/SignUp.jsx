import React from 'react';
import Header from '../components/Header-A';
import Title from '../components/Title';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
// import Footer from '../components/Footer';

const App = ()=> {

  return (
    <>
      <Header/>
      <form action='/auth/sign-in' method='post'>
        <br/>
        <Title title='Crear una cuenta' />
        <br/>
        <Input type='text' placeholder='User name' name='username'/>
        <Input type='text' placeholder='Correo electrónico' name='correo'/>
        <Input type='password' text='Crea una contraseña de mínimo 8 caracteres' placeholder='Crea una contraseña' name='password'/>
        <Input type='password' placeholder='Confirma la Contraseña' name='c-password'/>
        <Button className='btn-primary'>Crear</Button>
        <br/>
      </form>
      {/* <Footer/> */}
    </>
  );

};

export default App;
