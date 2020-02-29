const express = require('express');
const routes = require('./routes/routes');
const path = require('path');

// Create the app
const app = express();

// static files
app.use(express.static('public'));

// pug configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Set the ruoute
app.use('/', routes());

app.listen(3000);