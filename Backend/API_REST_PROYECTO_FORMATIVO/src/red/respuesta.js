exports.success = function (req, res, mensaje,status) {
    const statusCode = status || 200;
    const MensajeOk = mensaje || '';
    res.status(statusCode).send({
        error: false,
        status: status,
        data: MensajeOk,
    })
};
exports.error = function (req, res, mensaje,status) {
    const statusCode = status || 500;
    const MensajeError = mensaje || 'Error Interno de la API';
    res.status(statusCode).send({
        error: true,
        status: status,
        data: MensajeError,
    })
};