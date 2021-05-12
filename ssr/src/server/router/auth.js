const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios');

const config = require('../../../config');

require('../utils/auth/strategies/basic');

module.exports = function (app) {
  const router = express.Router();
  app.use('/auth', router);

  router.post('/sign-in', async function (req, res, next) {
    passport.authenticate('basic', function (error, data) {
      try {
        if (error || !data) {
          return next(boom.unauthorized());
        }
        req.login(data, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const { token, ...user } = data;

          res.cookie('token', token, {
            httpOnly: !config.dev,
            secure: !config.dev,
          });

          res.json(user).status(200);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', async function (req, res, next) {
    const { body: user } = req;

    try {
      await axios({
        url: `${config.apiUrl}/api/auth/sign-up`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: user,
      });

      res.status(201).json({ message: 'user created' });
    } catch (error) {
      next(error);
    }
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
  // app.post('/user-movies', async function (req, res, next) {
  //   try {
  //     const { body: userMovie } = req;
  //     const { token } = req.cookies;

  //     const { data, status } = await axios({
  //       url: `${config.apiUrl}/api/user-movies`,
  //       headers: { Authorization: `Bearer ${token}` },
  //       method: 'post',
  //       data: userMovie,
  //     });

  //     if (status !== 201) {
  //       return next(boom.badImplementation());
  //     }

  //     res.status(201).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

};
