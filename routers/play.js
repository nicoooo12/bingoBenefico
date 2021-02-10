const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')
router.get('/',isAuthenticate, async(req,res)=>{
  try {
    if(req.user){
      // console.log(req.user._id);
      let estado = await store.get('estados',{})
      let cartones = await store.get('cartones',{propietario_correo: req.user._id})
      let catalogos = await store.get('catalogos',{})
      res.render('play/play',{
        es: estado[0].estamosJuegando,
        cartones,
        catalogos
      })
    }
    else{
      res.render('play/play')
    }
  } catch (error) {
    res.send(error)
  }
})

router.get('/play', isAuthenticate, async (req,res)=>{
  try{
    let o = await store.get('cartones', {propietario_correo : req.user._id})
    let estado = await store.get('estados',{})
    let car = await store.get('catalogos', {})
    // console.log(o);
    if(estado[0].initJuego){
      res.render('play/jugar', {
        in : o,
        car,
        estado: estado[0],
      })
    }else{
      res.render('play/salaEspera', {
        message: estado[0].messajeEspera
      })
    }
  }
  catch(err){
    res.send(err)
  }
})

router.get('/:id', async (req,res)=>{
  try{
    let o = await store.get('cartones', {_id : req.params.id})
    // console.log(o);
    res.render('play/visual', {
      in : o[0].data
    })
  }
  catch(err){
    res.send(err)
  }
})

function isAuthenticate(req,res,next){
  if(req.isAuthenticated()){
      next()
  }else{
    res.redirect('/auth/signin?redirect='+req._parsedOriginalUrl.href)
  }
}


module.exports = router