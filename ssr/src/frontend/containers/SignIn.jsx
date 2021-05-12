import React from 'react';
import Header from '../components/Header-A';
import Title from '../components/Title';
// import Content from '../components/Content';
// import Section from '../components/Section';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
// import MainContent from '../components/MainContent';
// import Footer from '../components/Footer';

const App = ()=> {

  return (
    <>
      <Header/>
      <form action='/auth/sign-in' method='post'>
        <Title title='Ingresar' />
        <br/>
        <Input type='text' placeholder='User name' name='username'/>
        <Input type='password' placeholder='Contraseña' name='password'/>
        <Button>Ingresar</Button>
        <br/>
      </form>
      {/* <Footer/> */}
    </>
  );

};

export default App;
