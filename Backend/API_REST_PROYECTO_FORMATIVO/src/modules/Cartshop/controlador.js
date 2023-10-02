const db = require('./mysql');

const Tabla = 'cart';

function getCart(body) {
    return db.getCart(Tabla, body)
};


function Insert(body) {
    return db.Insert(Tabla,body)
};

function Update(body) {
    return db.Update(Tabla,body)
};

function Delete(body) {
    return db.Delete(Tabla,body)
}

module.exports = {
    getCart,
    Insert,
    Update,
    Delete
}