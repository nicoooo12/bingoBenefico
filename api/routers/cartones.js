const express = require('express')
const router = express.Router()
const config = require('../config')

const store = require('../libs/mongoose')
const cartonesService = require('../services/cartones')

module.exports = function (app) {
  app.use('/api',router)

  // API cartones ---
  router.get('/carton', async (req,res)=>{
    //obtener todos los cartones o solo uno de un user (?id_carton)
    try{

      let requestCatalogo = await store.get('cartones', (req.body.id&&req.body.id)) 

      res.json({
        error:false, 
        data:requestCatalogo,
        message:'ok',
      }).status(200)

    }
    catch(err){
      res.json({
        error:true,
        stack: config.dev ? err : false,
        message: 'Internal server error'
      }).status(500)
    }
  })
  router.post('/carton', async (req,res)=>{
    //crear un o mas cartones (user, tipo, cantidad)
    if(
      !req.body.propertyId || (typeof(req.body.propertyId) !== 'string') ||
      !req.body.cartones || (typeof(req.body.cartones) !== 'object')
    ){
      return res.json({
        error: true,
        message: 'data expected and not specified',
      }).status(400)
    }

    let errorDataArray = false;
    req.body.cartones.map((e)=>{
      if(
        !e.serie || (typeof(e.serie) !== 'number') ||
        !e.cantidad || (typeof(e.cantidad) !== 'number')
      ){
        errorDataArray = true; 
      }
    })

    if(errorDataArray){
      return res.json({
        error: true,
        message: 'data expected and not specified in array',
      }).status(400)
    }

    try {
      
      let newCartons=[];
      await req.body.cartones.map(async (e)=>{
        for(let i=1; i<= e.cantidad; i++){
          let newCarton = await cartonesService.createCarton(req.body.propertyId, e.serie)
          newCartons.push({
            data: newCarton.data,
            user_id: newCarton.user_id,
            serie: newCarton.serie
          })
        }

        res.json({
          error: false,
          data: newCartons,
          message: 'created'
        }).status(201)

      })

    } catch (err) {
      console.log(err);
      return res.json({
        error:true,
        stack: config.dev ? err : false,
        message:'Internal error server'
      }).status(500)
    }


  })
  router.delete('/carton', async (req,res)=>{
    //eliminar un carton (id)
    if(!req.body.id || (typeof(req.body.id) !== 'object')  ){
      return res.json({
        error: true,
        message: 'Data expected and not specified'
      }).status(400)
    }
 
    try{
      await store.delt('cartones', req.body.id)
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