import { pool } from '../db.js'

export const getUsuarios = (req, res) => res.send('obteniendo usuarios')

export const createUsuarios = async (req, res) => {
    const {username, userpassword, email, names, lastnames, birthdate, gender, phonenumber, rol} = req.body
    const [rows] = await pool.query ('INSERT INTO login (username, userpassword, email, names, lastnames, birthdate, gender, phonenumber, rol) VALUES (?,?,?,?,?,?,?,?,?)',[username, userpassword, email, names, lastnames, birthdate, gender, phonenumber, rol])
    res.send([rows])
}

export const updateUsuarios = (req, res) => res.send('Actualizando usuarios')

export const deleteUsuarios = (req, res) => res.send('Eliminando usuarios')