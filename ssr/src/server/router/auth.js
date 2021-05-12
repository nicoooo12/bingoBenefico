const express = require('express');
const router = express.Router();
const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios');
const config = require('../../../config');

module.exports = function (app) {
  app.use('/auth', router);

  app.post('/sign-in', async function (req, res, next) {
    passport.authenticate('basic', function (error, data) {
      try {
        if (error || !data) {
          next(boom.unauthorized());
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

          res.status(200).json(user);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  app.post('/sign-up', async function (req, res, next) {
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
