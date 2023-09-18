import { pool } from "../db.js";

export const getReviews = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reviews");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const getReviews_id = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reviews WHERE ID_Reviews = ?", [
      req.params.id_Reviews,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const createReviews = async (req, res) => {
  try {
    const {
      Reviewdescription,
      Stars,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO reviews (Reviewdescription, Stars) VALUES (?,?)",
      [
        Reviewdescription,
        Stars,
      ]
    );
    res.send([
      Reviewdescription,
      Stars,
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const updateReviews = async (req, res) => {
  try {
    const { ID_Reviews } = req.params;
    const {
      Reviewdescription,
      Stars,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE reviews SET Reviewdescription = IFNULL(?, Reviewdescription), Stars = IFNULL(?, Stars) WHERE ID_Reviews = ?",
      [Reviewdescription, Stars, ID_Reviews]
    );

    console.log(result);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM reviews WHERE ID_Reviews = ?", [
      ID_Reviews,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};

export const deleteReviews = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM reviews WHERE ID_Reviews = ?", [
      req.params.ID_Reviews,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong' });
  }
};
