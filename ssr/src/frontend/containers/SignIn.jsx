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
              <Title title='Ingresar' />
              <br/>
              <Input type='text' placeholder='User name' name='username'/>
              <Input type='password' placeholder='Contraseña' name='password'/>
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
