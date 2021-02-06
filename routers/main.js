const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')

router.get('/', (req,res)=>{
  if(req.isAuthenticated()){
    res.redirect('/inicio')
  }else{
    res.redirect('/auth/signin?redirect=/inicio')
  }
})

router.get('/inicio',isAuthenticate, (req,res)=>{
  res.render('principal/')
})

router.get('/play',isAuthenticate, async(req,res)=>{
  try {
    if(req.user){
      // console.log(req.user._id);
      let cartones = await store.get('cartones',{propietario_correo: req.user._id})
      let catalogos = await store.get('catalogos',{})
      res.render('principal/play',{
        cartones,
        catalogos
      })
    }
    else{
      res.render('principal/play')
    }
  } catch (error) {
    res.send(error)
  }
})

router.get('/about',isAuthenticate, (req,res)=>{
  res.render('principal/about')
})
router.get('/catalogo',isAuthenticate, async(req,res)=>{
  try {
    let catalogos = await store.get('catalogos',{})
    res.render('principal/catalogo',{
      catalogos
    })
  } catch (error) {
    res.send(error)
  }
})

router.get('/help', (req,res)=>{
  res.render('principal/help')
})

router.get('/contact', (req,res)=>{
  res.render('principal/contact')
})

router.get('/info', (req,res)=>{
  res.render('principal/info')
})

function isAuthenticate(req,res,next){
  if(req.isAuthenticated()){
      next()
  }else{
      res.redirect('/')
  }
}

module.exports = router