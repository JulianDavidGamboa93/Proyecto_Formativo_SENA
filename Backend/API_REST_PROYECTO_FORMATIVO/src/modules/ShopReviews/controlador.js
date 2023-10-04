const db = require('./mysql');

const Tabla = 'reviews';

function getReviews(body) {
    return db.getReviews(Tabla, body)
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
    getReviews,
    Insert,
    Update,
    Delete,
}