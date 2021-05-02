const express = require('express')
const passport = require('passport');

const scopesValidationHandler = require('../utils/middleware/scopeValidationHandler');

require('../utils/auth/strategies/jwt');


module.exports = function (app) {
  const router = express.Router()
  app.use('/api/orden',router)
  


  router.get('/', 
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:movies']),
  (req,res)=>{
    res.send(req.user)
  })

}