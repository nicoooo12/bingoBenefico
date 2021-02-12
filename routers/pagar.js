'use strict'

const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')
const WebpayPlus = require('transbank-sdk')
const Environment = require('transbank-sdk').Environment
const carton = require('../services/cartones')
const config = require('../config')

WebpayPlus.commerceCode = config.dev ? '597055555532' : config.wpCmmerceCode;
WebpayPlus.apiKey = config.dev ? '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C' : config.wpApiKey;
WebpayPlus.environment = config.dev ? Environment.Integration : Environment.Production;

router.get('/',isAuthenticate, async(req,res,next)=>{
try{
    let io = 0,
    productos=[],
    o = Object.keys(req.query)

  for (let i=1; i<= o.length; i++){
    if(+o[i-1]){
      let prs = await store.get('catalogos', {serie:o[i-1]})
      if(prs[0]){
        io += ( prs[0].precio *  +req.query[o[i-1]] )
        productos.push({producto: prs[0].titulo, precio: prs[0].precio, catidad: req.query[o[i-1]], total: ( prs[0].precio *  +req.query[o[i-1]] )})
      }
    }
  }
// console.log(typeof(req.query));
  const response = await WebpayPlus.WebpayPlus.Transaction.create(JSON.stringify(req.query).replace(/"/g,''), req.user._id, io, (config.host + 'pagar/end/'));
  res.render('compras/index',{
    compra : req.query,
    io: io,
    productos,
    payurl: response.url,
    paytoken: response.token,
  })
}catch(err){
  next(err)
}

})

router.get('/otros', isAuthenticate,async(req,res)=>{
  res.render('compras/error',{})
})

router.post('/end', async(req,res, next)=>{
  try {
    if(!req.isAuthenticated()){
      if(req.body.TBK_ID_SESION){
        let user = await store.get('users', {_id: req.body.TBK_ID_SESION})
          req.logIn(user[0], (err)=>{
            if(err){
              next(err)
            }
            // console.log('logIn succes TBK_ID_SESION');
          })
      }else{
        let response = await WebpayPlus.WebpayPlus.Transaction.commit(req.body.token_ws)
        let user = await store.get('users', {_id: response.session_id})
  
        req.logIn(user[0], (err)=>{
          if(err){
            next(err)
          }
          // console.log('logIn succes session_id');
        })
      }
    }
  
    if(req.body.TBK_TOKEN){
  
      res.render('compras/error',{})
    
    }else{
    
      const response = await WebpayPlus.WebpayPlus.Transaction.commit(req.body.token_ws);
      if(response.response_code >= 0){
        let p = Array.from(response.buy_order)
        let fini = ''
        p.map((e,o)=>{+e ? p[o] = `"${+e}"` : false})
        p.map(e=>{ fini += e })
        let finili = JSON.parse(fini)
        Object.keys(finili).map(async e=>{
          for(i=0; i <= (finili[e]-1); i++){
            // console.log(e);
            await carton.createCarton(response.session_id, +e)
          }
        })
        // console.log(finili);
        res.render('compras/exito',{})
      }else{
        res.render('compras/error',{})
      }
    }
    
  } catch (error) {
    next(error)
  }
})

function isAuthenticate(req,res,next){
  if(req.isAuthenticated()){
      next()
  }else{
    // console.log(req._parsedUrl.href);
      res.redirect('/auth/signin?redirect='+req._parsedUrl.href)
  }
}

module.exports = router
