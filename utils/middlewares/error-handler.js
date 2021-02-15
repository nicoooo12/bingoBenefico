const store = require('../../libs/mongoose')
const config = require('../../config')
async function errorReport(err,req,res,next){
  if(config.dev){
    res.send(err.message + '   ' +  err.stack)
  }else{
    try {
      let pu = await store.post('errores', {
        type: 'error 500',
        stack: err.stack,
        url: req._parsedUrl.href,
        user: req.user,
      })
      next(err)
    } catch (error) {
      console.log(error); 
    }
  }
}

function errorPrint(err,req,res,next){
  res.render('errors/error')
}

module.exports = {
  errorReport,
  errorPrint
}