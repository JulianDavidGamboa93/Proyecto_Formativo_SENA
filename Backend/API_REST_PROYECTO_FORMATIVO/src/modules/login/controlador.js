const db = require('./mysql');

const Tabla = 'login';

function getUsuario(body) {
    return db.getUsuario(Tabla, body)
};

function Where(body) {
    return db.Where(Tabla,body)
};

function WhereUser(body) {
    return db.WhereUser(Tabla, body)
}

function Insert(body) {
    return db.Insert(Tabla,body)
};

function Update(body) {
    return db.Update(Tabla,body)
};

function UpdateId(body) {
    return db.UpdateId(Tabla,body)
}

function Delete(body) {
    return db.Delete(Tabla,body);

}

module.exports = {
    getUsuario,
    Where,
    WhereUser,
    Insert,
    Update,
    UpdateId,
    Delete,

}