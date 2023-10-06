const mysql = require('mysql');
const config = require('../../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conexionMysql() {
    conexion = mysql.createConnection(dbConfig);
    conexion.connect((error)=>{
        if(error){
            console.log('[db Error]', error);
            setTimeout(conexionMysql, 200);
        }else{
        }
    });
    conexion.on('error', error => {
        console.log('[db Error]', error);
        if(error.code === 'PROTOCOL_CONNECTION_LOST'){
            conexionMysql();
        }else{
            throw error;
        }
    })
}

conexionMysql();

function getInvoice(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if(error)
                return reject(error);
                resolve(result);
        })
    })
}

function Insert(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error,result)=>{
            if(error)
                return reject(error);
                resolve(result);
            
        })
    })
};

function Update(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE Fullname = ?`, [data,data.Fullname], (error,result)=>{
            if(error)
                return reject(error);
                resolve(result);
            
        })
    })
};

function Delete(tabla, data) {
    return new Promise((resolve,reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE ID_Invoice = ?`, data.ID_Invoice,(error,result) => {
            if(error) 
                return reject(error);
                resolve(result);
            
        })
    })    
}

module.exports = {
    getInvoice,
    Insert,
    Update,
    Delete,
}