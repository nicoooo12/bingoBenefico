const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const userService = require('../../../services/users');

passport.use(
  new BasicStrategy(async function(email, password, cb) {
    try {
      const user = await userService.getUser({ email });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);