import React from 'react';
import Header from '../components/Header';
import Title from '../components/Title';
import Content from '../components/Content';
import Section from '../components/Section';
import Input from '../components/Input';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

const App = ()=> {

  return (
    <>
      <Header/>
      <MainContent>
        <Section>
          <Content>
            <form action='/auth/sign-in' method='post'>
              <br/>
              <Title title='Crear' />
              <br/>
              <Input type='text' placeholder='User name' name='username'/>
              <Input type='text' placeholder='Correo electrónico' name='correo'/>
              <Input type='text' placeholder='Numero de telefono' name='telefono'/>
              <Input type='password' placeholder='Crea una contraseña' name='password'/>
              <Input type='password' placeholder='Confirma la Contraseña' name='c-password'/>
              <button className='btn-primary'>Ingresar</button>
              <br/>
            </form>
          </Content>
        </Section>
      </MainContent>
      <Footer/>
    </>
  );

};

export default App;
