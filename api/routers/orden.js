const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')

module.exports = function (app) {
  app.use('/api',router)

  //API orden ---
  router.get('/orden', (req,res)=>{
    //obtener una orden de un user (id)
    res.send('hola mundo')
  })
  router.post('/orden', async (req,res)=>{
    //crear/generar una orden ([ventas_obj], totalPago, [pagos], tipoDePago)
    if (
      !req.body.compra || (typeof(req.body.compra) !== 'object') ||
      !req.body.totalPago || (typeof(req.body.totalPago) !== 'number') ||
      !req.body.tipoDePago || (typeof(req.body.tipoDePago) !== 'string')
      ) {
        return res.json({
        error: true,
        message: 'Data expected and not specified'
      }).status(400)
    }

    try{

      let newOrden = {
        compra: req.body.compra,
        totalPago: req.body.totalPago,
        tipoDePago: req.body.tipoDePago,
      }
      // await store.post('catalogos', {
      //   compra: [],
      //   totalPago: 10000,
      //   tipoDePago: 'transferencia',
      // })
      
      res.json({
        error: false,
        data: newOrden,
        message: 'created successfully'
      }).status(201)
      
    }
    catch{

      return res.json({
        error: true,
        message: 'Internal server error'
      }).status(500)

    }
    
  })

  
  router.put('orden', async (req,res)=>{
    //editar una orden (id, [ventas_obj], totalPago, [pagos], tipoDePago)
    if (!req.body.id){
      return res.json({
        error: true,
        message: 'Data expected and not specified'
      }).status(400)
    }

    try{
      let catalogoChange = await store.put('', req.body.id)

      res.json({
        error: false,
        data: catalogoChange,
        message: 'edited successfully',
      }).status(200)
    }
    catch{

      return res.json({
        error: true,
        message: 'Internal server error'
      }).status(500)
    
    }



  })
  router.delete('orden', async (req,res)=>{
    //eliminar una orden (id)
    if(!req.body.id){
      return res.json({
        error: true,
        message: 'Data expected and not specified'
      }).status(400)
    }
 
    try{
      await store.delt('', req.body.id)
      res.json({
        error: false,
        message: 'deleted successfully',
      }).status(200)
    }
    catch{

      return res.json({
        error: true,
        message: 'Internal server error'
      }).status(500)

    }

  })

}