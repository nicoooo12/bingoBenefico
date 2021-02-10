require('dotenv').config()

const config = {
  dev : process.env.NODE_ENV !== 'production ',
  port : process.env.PORT || 3000,
  host: process.env.HOST ,
  db: process.env.DB,
  wpCmmerceCode: process.env.WP_COMMERCE_CODE,
  wpApiKey: process.env.WP_API_KEY,
}

module.exports = config