import { pool } from "../db.js";

export const getInvoice = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM invoice");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const getInvoice_id = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM invoice WHERE ID_Invoice = ?", [
      req.params.id_Invoice,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const {
        Purchasedate, 
        Shipping, 
        Refund,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO invoice (Purchasedate, Shipping, Refund) VALUES (?,?,?)",
      [
        Purchasedate, 
        Shipping, 
        Refund,
      ]
    );
    res.send([
        Purchasedate, 
        Shipping, 
        Refund,
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { ID_Invoice } = req.params;
    const {
        Purchasedate, 
        Shipping, 
        Refund,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE invoice SET Purchasedate = IFNULL(?, Purchasedate), Shipping = IFNULL(?, Shipping), Refund = IFNULL(?, Refund) WHERE ID_Invoice = ?",
    [   Purchasedate, 
        Shipping, 
        Refund, 
        ID_Invoice,
    ]
    );

    console.log(result);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM invoice WHERE ID_Invoice = ?", [
      ID_Invoice,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM invoice WHERE ID_Invoice = ?", [
      req.params.ID_Invoice,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
