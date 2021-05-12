require('dotenv').config();

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3001,
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
  sessionSecret: process.env.SESSION_SECRET,
};
