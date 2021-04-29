const express = require('express')
const router = express.Router()
const config = require('../config')


module.exports = function (app) {
  app.use('/api',router)

  //API /catalogos ---
  router.get('/catalogos', async (req,res)=>{
    //obtener (id)
    
  })
  router.post('/catalogos', async (req,res)=>{
    //crear (cantidad_premio,[premios_obj], title, precio)
    if (
      !req.body.premios || (typeof(req.body.premios) !== 'object') ||
      !req.body.titulo || (typeof(req.body.titulo) !== 'string') ||
      !req.body.subTitulo || (typeof(req.body.subTitulo) !== 'string') ||
      !req.body.precio || (typeof(req.body.precio) !== 'number')
      ) {
        return res.json({
        error: true,
        message: 'Data expected and not specified'
      }).status(400)
    }

    try{

      let newCatalogo = await store.post('catalogos', {
        premios: req.body.premios,
        titulo: req.body.titulo,
        subTitulo: req.body.subTitulo,
        precio: req.body.precio,
      })
      
      res.json({
        error: false,
        data: newCatalogo,
        message: 'created'
      }).status(201)
      
    }
    catch(err){

      return res.json({
        error: true,
        stack: config.dev ? err : false,
        message: 'Internal server error'
      }).status(500)

    }

  })
  router.put('/catalogos', async (req,res)=>{
    //editar (id, cantidad_premio,[premios_obj], title, precio)
    if (
      !req.body.id || (typeof(req.body.id) !== 'object') ||
      (req.body.premios && (typeof(req.body.premios) !== 'object')) ||
      (req.body.titulo &&(typeof(req.body.titulo) !== 'string')) ||
      (req.body.subTitulo && (typeof(req.body.subTitulo) !== 'string')) ||
      (req.body.precio && (typeof(req.body.precio) !== 'number'))
    ){
      return res.json({
        error: true,
        message: 'Data expected and not specified'
      }).status(400)
    }

    try{
      // let catalogoChange = await store.put('catalogos', req.body.id, req.body)
      let editCatalogo = await store.put('catalogos', req.body.id, req.body)

      res.json({
        error: false,
        data: editCatalogo,
        message: 'edited successfully',
      }).status(200)
    }
    catch(err){

      console.log(err)

      return res.json({
        error: true,
        stack: config.dev ? err : false,
        message: 'Internal server error'
      }).status(500)
    
    }

  })
  router.delete('/catalogos', async (req,res)=>{
    //eliminar (id)
    if(!req.body.id || (typeof(req.body.id) !== 'object')  ){
      return res.json({
        error: true,
        message: 'Data expected and not specified'
      }).status(400)
    }
 
    try{
      await store.delt('catalogos', req.body.id)
      res.json({
        error: false,
        message: 'deleted successfully',
      }).status(200)
    }
    catch(err){

      return res.json({
        error: true,
        stack: config.dev ? err : false,
        message: 'Internal server error'
      }).status(500) 

    }
  })

}