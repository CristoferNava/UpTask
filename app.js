const express = require('express');
const routes = require('./routes/routes');

// Create the app
const app = express();

// Set the ruoute
app.use('/', routes());

app.listen(3000);