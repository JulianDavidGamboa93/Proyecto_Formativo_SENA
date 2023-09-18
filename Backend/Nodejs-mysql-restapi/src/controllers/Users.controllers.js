import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const getUsers_id = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE ID_Users = ?", [
      req.params.id_Users,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createUsers = async (req, res) => {
  try {
    const {
      Adress, 
      Active, 
      Socialmedias, 
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO users (Adress, Active, Socialmedias) VALUES (?,?,?)",
      [
      Adress, 
      Active, 
      Socialmedias, 
      ]
    );
    res.send([
      Adress, 
      Active, 
      Socialmedias,
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { ID_Users } = req.params;
    const {
      Adress, 
      Active, 
      Socialmedias,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE users SET Adress = IFNULL(?, Adress), Active = IFNULL(?, Active), Socialmedias = IFNULL(?, Socialmedias) WHERE ID_Users = ?",
      [Adress, Active, Socialmedias, ID_Users]
    );

    console.log(result);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE ID_Users = ?", [
      ID_Users,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE ID_Users = ?", [
      req.params.ID_Users,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
