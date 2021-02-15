const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')
const cartones = require('../services/cartones')

function isMod(req,res,next){
  
  if(req.isAuthenticated()){
    if(req.user.isMod){
      next()
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/auth/signin?redirect='+req._parsedUrl.href)
  }

}

router.get('/',isMod, async(req,res,next)=>{
  try {
    let otro = await store.get('metodoOtros', {})  
    let trans = await store.get('transferencias', {}) 
  
    res.render('mod',{
      otro,
      trans,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/create',isMod, async(req,res,next)=>{
  res.render('mod/hacerBingo')
})

router.post('/create', isMod, async(req,res,next)=>{
  try {
    cartones.createCarton(req.body.user, req.body.serial)
    res.redirect('/mod/create')
  } catch (error) {
    next(error)
  }
})

module.exports = router