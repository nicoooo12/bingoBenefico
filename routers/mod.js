const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')

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
    let otro = await store.get('metodoOtros', {id: req.user._id})  
    let trans = await store.get('transferencias', {id: req.user._id}) 
  
    res.render('mod',{
      otro,
      trans,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router