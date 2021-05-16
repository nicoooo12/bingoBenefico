import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '@containers/Home';
import Pruebas from '@containers/Pruebas';
import Catalogo from '@containers/Catalogo';
import Compra from '@containers/Compra';
import Cartones from '@containers/Cartones';
import Ordenes from '@containers/Ordenes';
import Play from '@containers/Play';
import SignIn from '@containers/SignIn';
import SignUp from '@containers/SignUp';
import Ayuda from '@containers/Ayuda';
// import Notfound from '@containers/Notfound';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { updateState } from '../actions';

const socket = io();
const App = ({ isLogged, updateState }) => {

  socket.emit('holaMundo', isLogged);
  socket.on('change', ()=>{
    console.log('[changes in the State]');
    updateState();
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/pruebas' component={Pruebas} />
        <Route exact path='/catalogo' component={Catalogo} />
        <Route exact path='/compra' component={Compra} />
        <Route exact path='/ordenes' component={Ordenes} />
        <Route exact path='/cartones' component={Cartones} />
        <Route exact path='/play' component={Play} />
        <Route exact path='/sign-in' render={(props) => <SignIn socket={socket} {...props} />}/>
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='/help' component={Ayuda} />
        {/* <Route component={Notfound} /> */}
      </Switch>
    </BrowserRouter>);
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  updateState,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
