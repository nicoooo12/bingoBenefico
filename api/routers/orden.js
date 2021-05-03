const express = require('express')
const passport = require('passport');

const scopesValidationHandler = require('../utils/middleware/scopeValidationHandler');
const validationHandler = require('../utils/middleware/validationHandler')

const {
  createUserSchema,
  addCanvasUrlSchema
} = require('../utils/schemas/orden')

const ordenServices = require('../services/ordenes')

/**
'create:orden',
'read:orden',
'read:ordenes',
'update:orden',
*/
require('../utils/auth/strategies/jwt');
module.exports = function (app) {
  const router = express.Router()
  app.use('/api/orden',router)
  
  router.post('/', //create orden
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:orden']),
  validationHandler(createUserSchema),
  async (req,res,next)=>{
    let {compra, totalPago, tipoDePago, } = req.body
    try {
      let newOden = await ordenServices.createOrden(
        compra,
        totalPago,
        tipoDePago,
        req.user._id
      )


      res.json({
        message: 'created',
        data: newOden,  
      }).status(201)

    } catch (err) {
      next(err)
    }
  })

  router.post('/canvas', //add canvas Url
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['create:orden']),
  validationHandler(addCanvasUrlSchema),
  async (req,res, next)=>{
    try {
      let addCanvasUrl = await ordenServices.addCanvasUrl(
        req.user._id,
        req.body.data
      )

      res.json({
        message: 'added',
        data: addCanvasUrl,
      }).status(201)

    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', //read orden (id)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:orden']), 
  async (req,res, next)=>{
    try {
      
      let getOrden = await ordenServices.getOrden(req.params)

      res.json({
        message:'ok',
        data: getOrden,
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.get('/', //read ordenes
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['read:ordenes']),
  async (req,res, next)=>{
    try {
      
      let getOrden = await ordenServices.getOrdenes()

      res.json({
        message:'ok',
        data: getOrden,
      }).status(200)

    } catch (err) {
      next(err)
    }
  })

  router.put('/:id', //update orden (id, data)
  passport.authenticate('jwt', { session: false }),
  scopesValidationHandler(['update:orden']),
  (req,res)=>{
    res.send(req.user)
  })

}