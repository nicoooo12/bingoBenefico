import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';
import Section from '../components/Section';
import Title from '../components/Title';
import Jugar from '../components/Jugar';
import Carton from '../components/Carton';
// import '../assets/styles/App.scss';
const App = (props)=> {

  return (
    <>
      <Header pag='/play' />
      <MainContent>
        <Title title='Jugar' />
        <Section>
          <Jugar />
        </Section>
        <Section>
          <Title title='Mis Cartones'/>
          {props.misCartones.map((e, index)=>{
            return <Carton key={index} title={e.title} serie={e.serie} data={e.data} color={e.color}/>;
          })}
        </Section>
      </MainContent>
      <Footer/>
    </>
  );

};

const mapStateToProps = (state)=>{
  return {
    misCartones: state.cartonesUser,
  };
};

export default connect(mapStateToProps)(App);
