const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const store = require('../mongoose')

passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser(async (id, done) => {
    const user = await store.get('users', {_id: id})
    user[0].password = ''
    done(null, JSON.parse(JSON.stringify(user[0])));

});

passport.use('local-signin', new localStrategy({
  usernameField : 'correo',
  passwordField : 'password',
  passReqToCallback : true
},async (req, username, password, done) => {
  const user = await store.get('users', {correo:username})
  if(user[0]){
    const userAuth = await store.get('auths', {id:user[0].id})
    if(!userAuth[0]) {
      return done(null, false, req.flash('error', {message : 'El usuario y/o contraseña son incorrecto', redirect: req._parsedOriginalUrl.search ? req._parsedOriginalUrl.search.replace('?redirect=', '') : ''}));
    }else if( !(await bcrypt.compare(password, userAuth[0].password))) {
      return done(null, false, req.flash('error', {message : 'El usuario y/o contraseña son incorrecto', redirect: req._parsedOriginalUrl.search ?  req._parsedOriginalUrl.search.replace('?redirect=', ''): ''}));
    }else {
      return done(null, user[0]);
    }
  }else{
    return done(null, false, req.flash('error', {message : 'El usuario y/o contraseña son incorrecto', redirect: req._parsedOriginalUrl.search ? req._parsedOriginalUrl.search.replace('?redirect=', '') : ''}));
  }
  
}));
