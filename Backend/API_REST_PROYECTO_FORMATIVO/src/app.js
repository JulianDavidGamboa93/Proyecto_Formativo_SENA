const express = require('express');
const morgan = require('morgan');
const config = require('./config');
//Correr npm install cors Despues ejecutar los siguientes comandos en app.js
const cors = require('cors');

const app = express();

//Habilitar CORS para todas las rutas de tu aplicación
app.use(cors());

//Rutas de Cabecera
const login = require('./modules/login/rutas');
const users = require('./modules/users/rutas');
const products = require('./modules/products/rutas');
const cart = require('./modules/Cartshop/rutas');
const invoice = require('./modules/invoice/rutas');
const reviews = require('./modules/ShopReviews/rutas');

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuracion
app.set('port', config.app.port);

//Ruta
app.use('/api/login', login);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/invoice', invoice);
app.use('/api/reviews/', reviews);

module.exports = app;


