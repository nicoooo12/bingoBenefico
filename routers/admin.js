const express = require('express')
const router = express.Router()
const models = require('../libs/mongoose/models')
const store = require('../libs/mongoose')

function isAdmin(req,res,next){
  
  if(req.isAuthenticated()){
    if(req.user.isAdmin){
      next()
    }else{
      res.redirect('/')
    }
  }else{
    res.redirect('/auth/signin?redirect='+req._parsedUrl.href)
  }

}

router.get('/',isAdmin, async(req,res)=>{
  
  // console.log(Object.keys(models));
  // console.log(Object.keys(models['users'].base.modelSchemas['users'].tree));
  // console.log((models['users'].base.modelSchemas['users'].paths));

  try {
    res.render('admin/db2', {
      models: Object.keys(models)
    })
  } catch (error) {
    res.render('admin/db2')
  }
})

router.get('/bingo',isAdmin, (req,res)=>{
  res.render('bingo/visual')
})

router.get('/control',isAdmin, async(req,res)=>{
  let s = await store.get('catalogos', {})
  res.render('bingo/control',{
    s,
  })
})

router.get('/:model',isAdmin, async(req,res)=>{
  let obj = []
  try {
    let c = await store.get(req.params.model, {})
    for(i=0; i <= (Object.keys(models[req.params.model].base.modelSchemas[req.params.model].tree).length-4); i++){
      obj.push({nombre : Object.keys(models[req.params.model].base.modelSchemas[req.params.model].tree)[i], type : (models[req.params.model].base.modelSchemas[req.params.model].paths[Object.keys(models[req.params.model].base.modelSchemas[req.params.model].tree)[i]].instance)})
    }
    // console.log(obj);
    res.render('admin/db1', {
      obj,
      c,
      model : req.params.model
    })
  } catch (error) {
    res.render('admin/db1')
  }
  // console.log(Object.keys(models[req.params.model].base.models));
  // console.log(Object.keys(models[req.params.model].base.modelSchemas[req.params.model].tree));
  // console.log((models[req.params.model].base.modelSchemas[req.params.model].paths));
})

router.post('/db/post/:model',isAdmin, async(req,res)=>{
  try {
    await store.post(req.params.model, JSON.parse(JSON.stringify(req.body).replaceAll('on', 'true')))
    // res.send('SUCCESS')
    res.redirect('/admin/' + req.params.model)
  } catch (error) {
    if(error){
      res.status(500).send( 'AA::ERROR:: ' + error)
    }
  }
})

router.post('/db/put/:model/:id/',isAdmin, async(req,res)=>{
  try {
    await store.put(req.params.model,{_id:req.params.id}, req.body)
    // res.send('SUCCESS')
    res.redirect('/admin/' + req.params.model)
  } catch (error) {
    if(error){
      res.status(500).send('CC::ERROR:: ' + error)
    }
  }
})

router.post('/db/delete/:model/:id',isAdmin, async(req,res)=>{
  try {
    await store.delt(req.params.model, {_id:req.params.id})
    // res.send('SUCCESS')
    res.redirect('/admin/' + req.params.model)
  } catch (error) {
    if(error){
      res.status(500).send('BB::ERROR:: ', error)
    }
  }
})

module.exports=router