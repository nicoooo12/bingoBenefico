const express = require('express')
const router = express.Router()
const store = require('../libs/mongoose')
router.get('/',isAuthenticate, async(req,res,next)=>{
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
    next(error)
  }
})

router.get('/play', isAuthenticate, async (req,res,next)=>{
  try{
    let o = await store.get('cartones', {propietario_correo : req.user._id})
    let estado = await store.get('estados',{})
    let car = await store.get('catalogos', {})
    // console.log(o);
    if(estado[0].estamosJuegando){
      if(estado[0].initJuego){
        if(o[0]){
          res.render('play/jugar', {
            in : o,
            car,
            estado: estado[0],
          })
        }else{
          res.render('play/noTengo',{})
        }
      }else{
        res.render('play/salaEspera', {
          message: estado[0].messajeEspera
        })
      }
    }else{
      res.redirect('/play')
    }
  }
  catch(err){
    next(err)
  }
})

router.get('/:id', async (req,res,next)=>{
  try{
    let o = await store.get('cartones', {_id : req.params.id})
    // console.log(o);
    res.render('play/visual', {
      in : o[0].data
    })
  }
  catch(err){
    next(err)
  }
})

function isAuthenticate(req,res,next){
  if(req.isAuthenticated()){
      next()
  }else{
    res.redirect('/auth?redirect='+req._parsedUrl.href)
  }
}


module.exports = router