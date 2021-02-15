const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')
const carton = require('../services/cartones')

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
      }else if(+o[i-1] >= 100 ){
        if(+o[i-1]-100 === 1){
          io += ( 800 *  +req.query[o[i-1]] )
          productos.push({producto: 'Cafe', precio: 800, catidad: req.query[o[i-1]], total: ( 800 *  +req.query[o[i-1]] )})
        }else if(+o[i-1]-100 === 2){
          io += ( 1500 *  +req.query[o[i-1]] )
          productos.push({producto: 'Comida tobi', precio: 1500, catidad: req.query[o[i-1]], total: ( 1500 *  +req.query[o[i-1]] )})
        }
      }
    }
  }
  // console.log(typeof(req.query));
  res.render('compras/index',{
    compra : req.query,//productos carrito 
    io: io,//total
    productos, //todos los productos
    que:req._parsedUrl.search ? req._parsedUrl.search.replace('?redirect=', '') : '',
  })
}catch(err){
  next(err)
}

})

router.get('/select/otros', isAuthenticate,async(req,res)=>{
  res.render('compras/selectOtros',{
    que: req._parsedUrl.search ? req._parsedUrl.search.replace('?redirect=', ''): ''
  })
})

router.get('/otros', isAuthenticate,async(req,res)=>{
  try {
    let io = 0,
    productos=[],
    o = Object.keys(req.query)
    for (let i=1; i<= o.length; i++){
      if(+o[i-1]){
        let prs = await store.get('catalogos', {serie:o[i-1]})
        if(prs[0]){
          io += ( prs[0].precio *  +req.query[o[i-1]] )
          productos.push({producto: prs[0].serie, precio: prs[0].precio, catidad: req.query[o[i-1]], total: ( prs[0].precio *  +req.query[o[i-1]] )})
        }else if(+o[i-1] >= 100 ){
          if(+o[i-1]-100 === 1){
            io += ( 800 *  +req.query[o[i-1]] )
            productos.push({producto: 'Cafe', precio: 800, catidad: req.query[o[i-1]], total: ( 800 *  +req.query[o[i-1]] )})
          }else if(+o[i-1]-100 === 2){
            io += ( 1500 *  +req.query[o[i-1]] )
            productos.push({producto: 'Comida tobi', precio: 1500, catidad: req.query[o[i-1]], total: ( 1500 *  +req.query[o[i-1]] )})
          }
        }
      }
    }
    res.render('compras/otros',{
      pedido: productos,
      monto:io,
      que: req._parsedUrl.search ? req._parsedUrl.search.replace('?redirect=', ''): ''
    })
  } catch (error) {
    next(error)
  }
})

router.post('/otros/init', isAuthenticate,async(req,res,next)=>{
  try {
        fin: false,
    await store.post('metodoOtros', {...req.body, id: req.user._id,
      fin: false,
      iniciado:false, monto: req.query.m, pedido: req.query.p, estado: 'Iniciado ~ En espera'})
    await store.put('users', {_id : req.user._id}, {compra: true})
    res.redirect('/pagar/otros/init')
  } catch (error) {
    next(error)
  }
  
})

router.get('/otros/init', isAuthenticate,async(req,res,next)=>{
  res.render('compras/init',{})
})

router.get('/select/transferencia', isAuthenticate,async(req,res)=>{
  res.render('compras/selectTreansferencia',{
    que: req._parsedUrl.search ? req._parsedUrl.search.replace('?redirect=', ''): ''
  })
})

router.get('/transferencia', isAuthenticate,async(req,res,next)=>{
  try {
    let io = 0,
    productos=[],
    o = Object.keys(req.query)

    for (let i=1; i<= o.length; i++){
      if(+o[i-1]){
        let prs = await store.get('catalogos', {serie:o[i-1]})
        if(prs[0]){
          io += ( prs[0].precio *  +req.query[o[i-1]] )
          productos.push({producto: prs[0].titulo+'~'+prs[0].serie, precio: prs[0].precio, catidad: req.query[o[i-1]], total: ( prs[0].precio *  +req.query[o[i-1]] )})
        }else if(+o[i-1] >= 100 ){
          if(+o[i-1]-100 === 1){
            io += ( 800 *  +req.query[o[i-1]] )
            productos.push({producto: 'Cafe', precio: 800, catidad: req.query[o[i-1]], total: ( 800 *  +req.query[o[i-1]] )})
          }else if(+o[i-1]-100 === 2){
            io += ( 1500 *  +req.query[o[i-1]] )
            productos.push({producto: 'Comida tobi', precio: 1500, catidad: req.query[o[i-1]], total: ( 1500 *  +req.query[o[i-1]] )})
          }
        }
      }
    }
    res.render('compras/transferencia',{
      pedido: productos,
      monto:io,
      que: req._parsedUrl.search ? req._parsedUrl.search.replace('?redirect=', ''): ''
    })
  } catch (error) {
    next(error)
  }
})

router.post('/transferencia', async(req, res, next)=> {
    try {
      await store.put('users', {_id : req.user._id}, {compra: true})
      await store.post('transferencias', {
        id: req.user._id, monto: req.query.m,
        nombre: `${req.user.nombre} ${req.user.apellido}`,
        pedido: req.query.p,
        fin: false,
        estado: 'Iniciado ~ En espera'
      })
      res.redirect('/pagar/comprobando')
    } catch (error) {
      next(error)
    }
    
})

router.get('/comprobando',(req,res)=>{
  res.render('compras/comprobando')
})

router.get('/estado', isAuthenticate,async(req,res,next)=>{
  try {
    let otro = await store.get('metodoOtros', {id: req.user._id})  
    let trans = await store.get('transferencias', {id: req.user._id})  


    let offO = false
    let offT = false
    if(trans[0]){
      if(trans.filter((e)=>{return e.fin === false})[0]){
        offT = false
      }else{
        offT = true
      }
    }else{
      offT = true
    }

    if(otro[0]){
      if(otro.filter((e)=>{return e.fin === false})[0]){
        offO = false
      }else{
        offO = true
      }
    }else{
      offO = true
    }

    if(offT && offO){
      await store.put('users', {_id: req.user._id}, {compra: false} )
    }else{
      await store.put('users', {_id: req.user._id}, {compra: true} )

    }


    res.render('compras/estado',{
      otro,
      trans,
    })
  } catch (error) {
    next(error)
  }

})

router.post('/cancelar/transfrerencia', isAuthenticate,async(req,res,next)=>{
  try {
    
    await store.delt('transferencias', {_id: req.body.id})  

    res.redirect('/pagar/estado')
  } catch (error) {
    next(error)
  }

})

router.post('/cancelar/otro', isAuthenticate,async(req,res,next)=>{
  try {
    console.log(req.body);
    await store.delt('metodoOtros', {_id: req.body.id})  

    res.redirect('/pagar/estado')
  } catch (error) {
    next(error)
  }

})

router.post('/end', async(req,res, next)=>{
  res.render('compras/exito')
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
