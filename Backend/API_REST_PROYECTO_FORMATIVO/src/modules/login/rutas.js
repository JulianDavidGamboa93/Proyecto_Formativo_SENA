const express = require('express');

const respuesta = require('../../red/respuesta');
const controlador = require('./controlador');

const router = express.Router();


router.get('/', async function (req, res){
    try {
        const items = await controlador.getUsuario(req.body);
        respuesta.success(req, res, items,200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

router.post('/Where', async function (req, res){
    try {
        const items = await controlador.Where(req.body);
        respuesta.success(req, res, items,200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});
router.post('/Insert', async function (req, res){
    try {
        const items = await controlador.Insert(req.body);
        respuesta.success(req, res, items,200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});
router.patch('/Update', async function (req, res){
    try {
        const items = await controlador.Update(req.body);
        respuesta.success(req, res, items,200);
    } catch (error) {
        respuesta.error(req, res, error, 500);
    }
});

module.exports = router;