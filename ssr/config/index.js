require('dotenv').config();

module.exports = {
  dev: process.env.NODE_ENV !== 'production ',
  port: process.env.PORT || 3001,
};
