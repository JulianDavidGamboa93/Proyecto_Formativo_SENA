import { pool } from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM login");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const getUsurio_id = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM login WHERE ID_Login = ?", [
      req.params.id_Login,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createUsuarios = async (req, res) => {
  try {
    const {
      Username,
      Userpassword,
      Email,
      Names,
      Lastnames,
      Birthdate,
      Gender,
      Phonenumber,
      Rol,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO login (Username, Userpassword, Email, Names, Lastnames, Birthdate, Gender, Phonenumber, Rol) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        Username,
        Userpassword,
        Email,
        Names,
        Lastnames,
        Birthdate,
        Gender,
        Phonenumber,
        Rol,
      ]
    );
    res.send([
      Username,
      Userpassword,
      Email,
      Names,
      Lastnames,
      Birthdate,
      Gender,
      Phonenumber,
      Rol,
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateUsuarios = async (req, res) => {
  try {
    const { ID_Login } = req.params;
    const {
      Userpassword,
      Names,
      Lastnames,
      Phonenumber,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE login SET userpassword = IFNULL(?, userpassword), names = IFNULL(?, names), lastnames = IFNULL(?, lastnames), phonenumber = IFNULL(?, phonenumber) WHERE ID_Login = ?",
      [Userpassword, Names, Lastnames, Phonenumber, ID_Login]
    );

    console.log(result);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM login WHERE ID_Login = ?", [
      ID_Login,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM login WHERE ID_Login = ?", [
      req.params.ID_Login,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
