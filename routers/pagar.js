'use strict'

const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')
const carton = require('../services/cartones')
const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/comprobantes/')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}(${req.Datee}).${file.mimetype.match(/[a-z]{1,}$/)[0]}`) //Appending .jpg
  }
})
const upload = multer({ storage: storage}).single('comprobante')


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
    await store.post('metodoOtros', {...req.body, id: req.user._id, iniciado:false, monto: req.query.m, pedido: req.query.p})
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
  req.Datee = Date.now()
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      next(err)
    } else if (err) {
      next(err)
    }
    try {
      let ext = req.file.mimetype.match(/[a-z]{1,}$/)[0]
      await store.post('transferencias', {id: req.user._id, imgDate: req.Datee, monto: req.query.m, nombre: `${req.user.nombre} ${req.user.apellido}`, pedido: req.query.p, ext })
      res.redirect('/pagar/comprobando')
    } catch (error) {
      next(error)
    }
  })
    
})

router.get('/comprobando',(req,res)=>{
  res.render('compras/comprobando')
})

router.get('/estado', isAuthenticate,async(req,res,next)=>{
  try {
    let otro = await store.get('metodoOtros', {id: req.user._id})  
    let trans = await store.get('transferencias', {id: req.user._id})  

    

    if(!otro.filter((e)=>{
      return e.fin === false
    })[0] && !trans.filter((e)=>{
      return e.fin === false
    })[0]){
      await store.put('users', {_id: req.user._id}, {compra: false} )
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
