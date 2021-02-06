const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')
const carton = require('../services/cartones')

router.get('/', (req,res)=>{
  res.render('cartones/createCartones')
})

router.get('/:id', async (req,res)=>{
  try{
    let o = await store.get('cartones', {_id : req.params.id})
    // console.log(o);
    res.render('cartones/visual', {
      in : o[0].data
    })
  }
  catch(err){
    res.send(err)
  }
})

router.get('/generar/:serial/:propietario', async (req,res)=>{
  res.send(await carton.createCarton(req.params.propietario,req.params.serial))

})

module.exports = router