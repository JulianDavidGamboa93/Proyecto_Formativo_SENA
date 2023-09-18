import { pool } from "../db.js";

export const getCart = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cart");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const getCart_id = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cart WHERE ID_Cart = ?", [
      req.params.ID_Cart,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createCart = async (req, res) => {
  try {
    const {
    Quantity,
    Unitprice,
    Cartstatus, 
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO cart (Quantity, Unitprice, Cartstatus) VALUES (?,?,?)",
      [
        Quantity,
        Unitprice,
        Cartstatus, 
      ]
    );
    res.send([
        Quantity,
        Unitprice,
        Cartstatus, 
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { ID_Cart } = req.params;
    const {
        Quantity,
        Unitprice,
        Cartstatus,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE cart SET Quantity = IFNULL(?, Quantity), Unitprice = IFNULL(?, Unitprice), Cartstatus = IFNULL(?, Cartstatus) WHERE ID_Cart = ?",
    [ Quantity,
      Unitprice,
      Cartstatus,  
      ID_Cart,
    ]
    );

    console.log(result);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM cart WHERE ID_Cart = ?", [
      ID_Cart,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM cart WHERE ID_Cart = ?", [
      req.params.ID_Cart,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
