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

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuracion
app.set('port', config.app.port);

//Ruta
app.use('/api/login', login);

module.exports = app;


