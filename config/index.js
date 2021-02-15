require('dotenv').config()

const config = {
  dev : process.env.NODE_ENV !== 'production ',
  port : process.env.PORT || 3000,
  secret : process.env.SECRET,
  host: process.env.HOST ,
  db: process.env.DB,
}

module.exports = config