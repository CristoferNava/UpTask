const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// Database conection
const db = require('./config/db');
require('./models/Projects');
require('./models/Tasks');
require('./models/Users');
db.sync()
  .then(() => {console.log('Conexión a la base de datos establecida')})
  .catch((err) => {console.log(err)});

// Create the app
const app = express();

// Bodyparser config
app.use(bodyParser.urlencoded({extended: true}));

// static files
app.use(express.static('./public'));

// pug configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// app.use(expressValidator());
app.use(cookieParser());

// sesiones para nevegar entre distintas páginas sin tener que volvernos a 
// autenticar
app.use(session({
  secret: 'revisar esto',
  resave: false,
  saveUnitialized: false
}));

// passport config
app.use(passport.initialize());
app.use(passport.session());

// using flash
app.use(flash());

// Helpers config
const helpers = require('./helpers');
app.use((req, res, next) => {
  res.locals.getData = helpers.getData; // Permite consumir getData en todos los archivos del proyecto
  res.locals.messages = req.flash(); // Usar los mensajes de flash
  res.locals.user = {...req.user} || null; // Si el usuario existe lo asignamos sino asignamos null
  next(); // Siguiente middleware
});

// Set the ruoute
app.use('/', routes());

app.listen(3000);