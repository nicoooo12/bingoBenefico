const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const exsession = require('cookie-session')
const flash = require('connect-flash')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const config = require('./config')

const errorsHandler = require('./utils/middlewares/error-handler')

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
  secret : config.secret,
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
require('./sockets')(io)
app.use('/',require('./routers/main'))
app.use('/auth',require('./routers/auth'))
app.use('/admin',require('./routers/admin'))
app.use('/mod',require('./routers/mod'))
app.use('/play',require('./routers/play'))
app.use('/pagar',require('./routers/pagar'))
app.use('/api',require('./routers/api'))
app.use('/public',express.static(path.join(__dirname, 'public')))

//404
app.use((req,res)=>{
  res.render('errors/404')
})
//errors
app.use(errorsHandler.errorReport)
app.use(errorsHandler.errorPrint)

server.listen(config.port, ()=>{
  console.log(`server listening on port ${config.port} in ${config.dev ? 'development':'production'} mode`);
})