const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const bodyParser = require('body-parser');
require('express-validator')
const flash = require('connect-flash')

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

// add flash to the project
app.use(flash())

// Helpers config
const helpers = require('./helpers');
app.use((req, res, next) => {
  res.locals.getData = helpers.getData; // Permite consumir getData en todos los archivos del proyecto
  next(); // Siguiente middleware
});

// Set the ruoute
app.use('/', routes());

app.listen(3000);