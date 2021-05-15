import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '@containers/Home';
import Pruebas from '@containers/Pruebas';
import Catalogo from '@containers/Catalogo';
import Compra from '@containers/Compra';
// import Play from '@containers/Play';
import SignIn from '@containers/SignIn';
import SignUp from '@containers/SignUp';
// import Styles from '@containers/Styles';
// import Notfound from '@containers/Notfound';

const App = ({ isLogged }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/pruebas' component={Pruebas} />
      <Route exact path='/catalogo' component={Catalogo} />
      <Route exact path='/compra' component={Compra} />
      {/* <Route exact path='/play' component={Play} /> */}
      <Route exact path='/sign-in' component={SignIn} />
      <Route exact path='/sign-up' component={SignUp} />
      {/* <Route exact path='/styles' component={Styles} /> */}
      {/* <Route component={Notfound} /> */}
    </Switch>
  </BrowserRouter>
);

export default App;
