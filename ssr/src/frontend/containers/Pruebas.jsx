import React from 'react';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import Accordion from '../components/forms/Accordion';
import Card from '../components/display/Card';
import IncrementStepper from '../components/forms/IncrementStepper';

import '../assets/styles/App.scss';
const App = ()=> {

  return (
    <>
      <Card>
        <Input type='password' placeholder='Contraseña' name='password' text='Crea una contraseña. Mínimo 8 caracteres'/>
        <Button typeButton='primary'> hola</Button>
        <Accordion title='Necesito ayuda'>
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
          bla bla bla bla bla
        </Accordion>
        <IncrementStepper>hola</IncrementStepper>
      </Card>
    </>
  );

};

export default App;
