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
            console.log('Bases de datos Conectada');
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

function getUsuario(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if(error)
                return reject(error);
                resolve(result);
        })
    })
}


function Where(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Username = ? And Userpassword = ?`, [data.Username,data.Userpassword], (error,result)=>{
            if(error)
                return reject(error);
                resolve(result);
            
        })
    })
};

function WhereUser(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE Username = ?, Userpassword = ?, Email = ?, Names = ?, Lastnames = ?, Phonenumber = ?`, [data.Username,data.Userpassword,data.Email,data.Names,data.Lastnames,data.Phonenumber], (error,result)=>{
            if(error)
                return reject(error);
                resolve(result);
            
        })
    })
};
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
        conexion.query(`UPDATE ${tabla} SET ? WHERE Username = ?`, [data,data.Username], (error,result)=>{
            if(error)
                return reject(error);
                resolve(result);
            
        })
    })
};

function UpdateId(tabla, data) {
    return new Promise((resolve, reject) =>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE ID_Login = ?`, [data,data.ID_Login], (error,result)=>{
            if(error)
                return reject(error);
                resolve(result);
            
        })
    })
};



function Delete(tabla, data) {
    return new Promise((resolve,reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE ID_Login = ?`, data.ID_Login,(error,result) => {
            if(error) 
                return reject(error);
                resolve(result);
            
        })
    })    
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
