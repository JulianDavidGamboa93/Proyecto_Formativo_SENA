const db = require('./mysql');

const Tabla = 'login';

function All() {
    return db.All(Tabla);
}

function Where(body) {
    return db.Where(Tabla, body);
}

function Add(body) {
    return db.Add(Tabla,body);
}

function Update(body) {
    return db.Update(Tabla,body)
}

function Delete(body) {
    return db.Delete(Tabla,body);

}


module.exports = {
    All,
    Where,
    Add,
    Update,
    Delete
}

