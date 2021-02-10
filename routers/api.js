const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')

function isAdmin(req,res,next){
  next()
  // if(req.isAuthenticated()){
  //   if(req.user.isAdmin){
  //     next()
  //   }else{
  //     res.redirect('/')
  //   }
  // }else{
  //   res.redirect('/auth/signin?redirect=/admin')
  // }

}

router.get('/:model',isAdmin, async(req,res)=>{
  try {
    let o = await store.get(req.params.model, req.body)
    res.status(200).json({
      o
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

router.post('/db/post/:model',isAdmin, async(req,res)=>{
  try {
    let o = await store.post(req.params.model, req.body)
    res.status(201).json({
      o
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

router.post('/db/put/:model/:id/',isAdmin, async(req,res)=>{
  try {
    let o = await store.put(req.params.model,{_id:req.params.id}, JSON.parse(req.body.data))
    res.status(200).json({
      o
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

router.post('/db/delete/:model/:id',isAdmin, async(req,res)=>{
  try {
    let o = await store.delt(req.params.model, {_id:req.params.id})
    res.status(200).json({
      o
    })
  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

module.exports=router