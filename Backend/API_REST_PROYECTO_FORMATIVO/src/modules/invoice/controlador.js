const db = require('./mysql');

const Tabla = 'invoice';

function getInvoice(body) {
    return db.getInvoice(Tabla, body)
};

function Insert(body) {
    return db.Insert(Tabla,body)
};

function Update(body) {
    return db.Update(Tabla,body)
};

module.exports = {
    getInvoice,
    Insert,
    Update
}