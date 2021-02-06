const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const exsession = require('express-session')
const flash = require('connect-flash')

const app = express()
const config = require('./config')
require('./libs/passport')

require('./libs/mongoose/conect')(config.db)

//engine
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./utils/handlerbars'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}
}))
app.set('view engine', '.hbs');

//middleware
app.use(cors())
app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(exsession({
  secret : 'hola mundito',
  resave : false,
  saveUninitialized : false,
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  app.locals.error = req.flash('error');
  app.locals.redirect = req.flash('redirect');
  app.locals.salida = req.flash('salida');
  app.locals.user = req.user;
  next();
});

//routers
app.use('/',require('./routers/main'))
app.use('/auth',require('./routers/auth'))
app.use('/admin',require('./routers/admin'))
app.use('/carton',require('./routers/cartones'))
app.use('/pagar',require('./routers/pagar'))
app.use('/bingo',require('./routers/bingo'))
app.use('/public',express.static(path.join(__dirname, 'public')))
// app.use('/control',require('./routers/cartones'))

//404
app.use((req,res)=>{
  res.send('404')
})
//errors
app.use((err,req,res,next)=>{
  res.send('::ERROR::'+ err)
})

app.listen(config.port, ()=>{
  console.log(`server listening on port ${config.port} in ${config.dev ? 'development':'production'} mode`);
})