const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../../config');

module.exports = function (app) {
  app.use('/api', router);

  router.post('/getState', async (req, res)=>{
    const { token, email, name, id } = req.cookies;

    let cartones;
    try {
      const { data: dataCartones } = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/cartones/mys`,
      });
      cartones = dataCartones.data;
    } catch (error) {
      // console.log(error);
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
      // console.log(error);
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
      // console.log(error);
      myEndsOrden = [];
    }
    let myInProgressOrden;
    try {
      const { data: dataOrden } = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/orden/my`,
      });
      myInProgressOrden = dataOrden.data[0];
    } catch (error) {
      // console.log(error);
      myInProgressOrden = {};
    }

    const newState = {
      'user': user,
      'cartonesUser': cartones,
      'ordenes': {
        enProgreso: myInProgressOrden,
        terminadas: myEndsOrden,
      },
    };

    res.json({
      data: newState,
    }).status(200);

  });

  router.post('/createOrden', async (req, res, next)=>{
    const { token } = req.cookies;

    // console.log(req.body);

    try {
      const { data: dataOrden } = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/orden/my`,
        data: req.body,
      });

      res.json({
        data: dataOrden,
      }).status(200);

    } catch (error) {
      // console.log(error.request.data);
      next(error);
    }

  });

  router.post('/createCanvas', async (req, res, next)=>{
    const { token } = req.cookies;

    // console.log(req.body);

    try {
      const { data: dataOrden } = await axios({
        method: 'post',
        headers: { Authorization: `Bearer ${token}` },
        url: `${config.apiUrl}/api/orden/canvas`,
        data: req.body,
      });

      res.json({
        data: dataOrden,
      }).status(200);

    } catch (error) {
      // console.log(error.request.data);
      next(error);
    }

  });

};
