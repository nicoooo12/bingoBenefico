const express = require('express');
const helmet = require('helmet');
const config = require('../../config');
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import reducer from '../frontend/reducers';
// import initialState from '../frontend/initialState';
import serverRoutes from '../frontend/router/serverRouter';

const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const passport = require('passport');
// const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

// require('./utils/auth/strategies/basic');

if (config.dev) {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config.dev.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    serverSideRender: true,
    publicPath: webpackConfig.output.publicPath,
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(`${__dirname}/../../dist`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

const setResponse = (html, preloadedState, nonce) => {
  return (`
  <!DOCTYPE html>
  <html lang="es-Es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta charset="utf-8" />
    <link rel="stylesheet" href="main.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <title>Bingoloteando</title>
  </head>
  <body>
    <div id="react">${html}</div>
    <script id="preloadedState" nonce=${nonce}>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src="bundle.js" type="text/javascript"></script>
  </body>
  </html>
  `);
};

const renderApp = async (req, res) => {

  const { token, email, name, id } = req.cookies;

  let catalogo;
  try {
    const { data } = await axios({
      method: 'get',
      url: `${config.apiUrl}/api/catalogos`,
    });
    catalogo = data.data;
  } catch (error) {

  }
  let cartones;
  try {
    const { data: dataCartones } = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
      url: `${config.apiUrl}/api/cartones/mys`,
    });
    cartones = dataCartones.data;
    // myOrden = dataOrden.data.estado;
  } catch (error) {
    cartones = {};
  }

  let user;
  try {
    await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
      url: `${config.apiUrl}/api/auth/isauth`,
    });

    user = {
      name,
      email,
      id,
    };
  } catch (error) {
    user = {};
  }

  let myEndsOrden;
  try {
    const { data: dataOrden } = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
      url: `${config.apiUrl}/api/orden/terminadas/my`,
    });
    myEndsOrden = dataOrden.data;
  } catch (error) {
    myEndsOrden = [];
  }
  let myInProgressOrden;
  try {
    const { data: dataOrden } = await axios({
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
      url: `${config.apiUrl}/api/orden/my`,
    });
    myInProgressOrden = dataOrden.data[0] ? dataOrden.data[0] : {};
  } catch (error) {
    myInProgressOrden = {};
  }

  const initialState = {
    'user': user,
    'redirect': '',
    'cartonesUser': cartones,
    'ordenes': {
      enProgreso: myInProgressOrden,
      terminadas: myEndsOrden,
    },
    'catalogos': catalogo,
    'carrito': {
      active: false,
      state: (myInProgressOrden.user ? 1 : 0),
      data: [],
    },
  };

  const nonceGenerator = uuidv4();
  res.set('Content-Security-Policy', `script-src 'self' 'nonce-${nonceGenerator}';`);

  // console.log(initialState);
  const isLogged = (initialState.user.id);
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes(isLogged))}
      </StaticRouter>
    </Provider>,
  );
  res.send(setResponse(html, preloadedState, nonceGenerator));
};

require('./router/auth')(app);
require('./router/api')(app);
app.get('*', renderApp);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port} in ${config.dev ? 'development' : 'production'} mode`);
});
