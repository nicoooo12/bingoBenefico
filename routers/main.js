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
  // console.log(req.user, req.session);
  res.render('principal/')
})

router.get('/about', (req,res)=>{
  res.render('principal/about')
})

router.get('/donar',isAuthenticate, (req,res)=>{
  res.render('principal/donar')
})
router.get('/catalogo',isAuthenticate, async(req,res,next)=>{
  try {
    let catalogos = await store.get('catalogos',{})
    res.render('principal/catalogo',{
      catalogos
    })
  } catch (error) {
    next(error)    
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
    res.redirect('/auth/signin?redirect='+req._parsedUrl.href)
  }
}

module.exports = router