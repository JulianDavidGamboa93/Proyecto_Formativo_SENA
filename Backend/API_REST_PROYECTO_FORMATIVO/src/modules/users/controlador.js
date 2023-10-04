const db = require('./mysql');

const Tabla = 'users';

function getUsuarios(body) {
    return db.getUsuarios(Tabla, body)
};

function Insert(body) {
    return db.Insert(Tabla,body)
};

function Update(body) {
    return db.Update(Tabla,body)
};

function Delete(body) {
    return db.Delete(Tabla,body);

}

module.exports = {
    getUsuarios,
    Insert,
    Update,
    Delete,
}