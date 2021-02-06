require('dotenv').config()

const config = {
  dev : process.env.NODE_ENV !== 'production ',
  port : process.env.PORT || 3000,
  db: process.env.DB || 'mongodb+srv://nicof:gsEyuS6Z2wa4bTGz@cluster0.dpqrk.mongodb.net/bingo?retryWrites=true&w=majority',
}

module.exports = config