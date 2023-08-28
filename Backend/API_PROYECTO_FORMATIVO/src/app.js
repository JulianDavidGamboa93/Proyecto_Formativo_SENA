const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const app = express();

//Rutas
const login = require('./modules/login/rutas');
//const users = require('./modules/users/rutas');
//const products = require('./modules/products/rutas');
//const invoice = require('./modules/invoice/rutas');

//middle board
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuration
app.set('port', config.app.port);

//Rules
app.use('/api/login', login);
//app.use('api/products', products);

module.exports = app;



