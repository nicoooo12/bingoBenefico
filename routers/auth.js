const express = require('express')
const router = express.Router()
const passport = require('passport');
const store = require('../libs/mongoose')
const bcrypt = require('bcrypt')

router.get('/signin', (req,res)=>{
  // console.log(req._parsedUrl.search.replace('?redirect=', ''));
  // console.log(req._parsedUrl);
  res.render('auth/signin',{   
    redirect : req._parsedUrl.search ? req._parsedUrl.search.replace('?redirect=', '') : '',
  })
})

router.post('/signin', passport.authenticate('local-signin',{
  failureRedirect: './signin',
  failureFlash: true  
}), (req,res)=>{
  // console.log(1);
  if(req.query.redirect === ''){
    res.redirect('/') 
  }else{
    res.redirect(req._parsedUrl.search.replace('?redirect=', ''))
  }
})

router.get('/signup', (req,res)=>{
  res.render('auth/signup',{
    title : 'signup',
    redirect : req.query.redirect || ''  
  })
})

router.post('/signup', async (req, res) => {
  let { nombre, apellido, correo, password } = req.body
  const user = await store.get('users', {correo: correo})
  if (user[0]) {
      res.render('auth/signup', { error: 'Esta cuenta ya esta ocupada :(' })
      return false
  } else {
      const newUser = {
          nombre: nombre,
          apellido: apellido,
          correo: correo,
      }
      let post = await store.post('users', newUser)
      const newUserAuth = {
          id: post._id,
          password: await bcrypt.hash(password, 10)
      }
      await store.post('auths', newUserAuth)
      console.log('new users');
      res.redirect('/auth/signin')
  }
})

router.get('/logout', (req, res)=> {
  req.logOut()
  // console.log(req._parsedUrl);

  res.redirect('/auth/signin'+req._parsedUrl.search)
})

module.exports = router