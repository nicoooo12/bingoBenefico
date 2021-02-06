const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')
const WebpayPlus = require('transbank-sdk')
const Environment   = require('transbank-sdk').Environment
const passport = require('passport');
const { cartones } = require('../libs/mongoose/models')
const carton = require('../services/cartones')

WebpayPlus.commerceCode = 597055555532;
WebpayPlus.apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
WebpayPlus.environment = Environment.Integration;

router.get('/',isAuthenticate, async(req,res)=>{
  let io = 0,
      productos=[],
      o = Object.keys(req.query)
 
      for (i=1; i<= o.length; i++){
    if(+o[i-1]){
      let prs = await store.get('catalogos', {serie:o[i-1]})
      if(prs[0]){
        io += ( prs[0].precio *  +req.query[o[i-1]] )
        productos.push({producto: prs[0].titulo, precio: prs[0].precio, catidad: req.query[o[i-1]], total: ( prs[0].precio *  +req.query[o[i-1]] )})
      }
    }
  }
  const response = await WebpayPlus.WebpayPlus.Transaction.create(JSON.stringify(req.query).replaceAll('"',''), req.user._id, io, ('http://localhost:3000/pagar/end/'));
  res.render('compras/p1',{
    compra : req.query,
    io: io,
    productos,
    payurl: response.url,
    paytoken: response.token,
  })
})

// router.get('/initpay', isAuthenticate,async(req,res)=>{
//   // console.log(WebpayPlus.WebpayPlus);

//   res.render('compras/p2',{})
// })

router.post('/end', async(req,res)=>{
  if(req.isAuthenticated()){
    if(req.body.TBK_TOKEN){
      res.render('compras/p2',{})
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
        res.render('compras/p3',{})
      }else{
        res.render('compras/p2',{})
  
      }
    }
  }else{
    let user = await store.get('users', {_id: req.body.TBK_ID_SESION ? req.body.TBK_ID_SESION : req.body.session_id})
    // console.log('user :: :: ',user);
    // console.log('user :: :: ',user[0]._id);

    res.render('auth/auth',{
      redirect: req._parsedOriginalUrl.href,
      correo: user[0]._id,
    })
  }
})



function isAuthenticate(req,res,next){
  if(req.isAuthenticated()){
      next()
  }else{
    // console.log(req._parsedOriginalUrl.href);
      res.redirect('/auth/signin?redirect='+req._parsedOriginalUrl.href)
  }
}

module.exports = router