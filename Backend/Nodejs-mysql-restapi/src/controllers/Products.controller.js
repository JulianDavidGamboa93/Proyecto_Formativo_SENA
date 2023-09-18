import { pool } from "../db.js";

export const getItems = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const getItems_id = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE ID_Products = ?", [
      req.params.ID_Products,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createItems = async (req, res) => {
  try {
    const {
      Price,
      Productdesc,
      Beantype,
      Category,
      Roasted, 
      Processing, 
      Stock, 
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO products (Price, Productdesc, Beantype, Category, Roasted, Processing, Stock) VALUES (?,?,?,?,?,?,?)",
      [
      Price,
      Productdesc,
      Beantype,
      Category,
      Roasted, 
      Processing, 
      Stock, 
      ]
    );
    res.send([
      Price,
      Productdesc,
      Beantype,
      Category,
      Roasted, 
      Processing, 
      Stock, 
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateItems = async (req, res) => {
  try {
    const { ID_Products } = req.params;
    const {
      Price,
      Productdesc,
      Beantype,
      Category,
      Roasted, 
      Processing, 
      Stock, 
    } = req.body;

    const [result] = await pool.query(
      "UPDATE products SET Price = IFNULL(?, Price), Productdesc = IFNULL(?, Productdesc), Beantype = IFNULL(?, Beantype), Category = IFNULL(?, Category), Roasted = IFNULL(?, Roasted), Processing = IFNULL(?, Processing), Stock = IFNULL(?, Stock) WHERE ID_Products = ?",
      [
        Price,
        Productdesc,
        Beantype,
        Category,
        Roasted, 
        Processing, 
        Stock,
        ID_Products]
    );

    console.log(result);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM login WHERE ID_Products = ?", [
      ID_Products,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteItems = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM login WHERE ID_Products = ?", [
      req.params.ID_Products,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
