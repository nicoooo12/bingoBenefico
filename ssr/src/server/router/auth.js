const express = require('express');
const router = express.Router();
module.exports = function (app) {
  app.use('/auth', router);

  router.post('/sign-in', (req, res)=>{
    res.send(req.body);
  });

};
