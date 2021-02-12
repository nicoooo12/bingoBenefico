const store = require('../../libs/mongoose')

function errorReport(err,req,res,next){
  store.post('errores', {
    type: 'error 500',
    stack: err.stack,
    url: req._parsedUrl.href,
    user: req.user,
  })
}

function errorPrint(err,req,res,next){
  res.render('errors/error')
}

module.exports = {
  errorReport,
  errorPrint
}