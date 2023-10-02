const db = require('./mysql');

const Tabla = 'products';

function getProducts(body) {
    return db.getProducts(Tabla, body)
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
    getProducts,
    Insert,
    Update,
    Delete
}