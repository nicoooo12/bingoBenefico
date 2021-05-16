const express = require('express');
const boom = require('@hapi/boom');
// const axios = require('axios');

const config = require('../../../config');

module.exports = function (app) {
  const router = express.Router();
  app.use('/sockets', router);

  router.post('/updateInfo/:user', async function (req, res, next) {
    res.send('ok');
  });

  const withErrorStack = (error, stack)=>{
    if (config.dev) {
      return { ...error, stack };
    }
    return error;
  };

  router.use(
    function logErrors(err, req, res, next) {
      // console.log(err);
      next(err);
    },
    function wrapErrors(err, req, res, next) {
      if (!err.isBoom) {
        next(boom.badImplementation(err));
      }
      next(err);
    },
    function errorHandler(err, req, res, next) {
      const {
        output: { statusCode, payload },
      } = err;
      res.status(statusCode);
      res.json(withErrorStack(payload, err.stack));
    });

};
