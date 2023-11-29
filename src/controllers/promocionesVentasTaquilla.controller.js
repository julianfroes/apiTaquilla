import { pool } from "../db.js";

export const getPromocionesVentaTaquilla = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Promociones_Venta_Taquilla");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPromocionVentaTaquillaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM Promociones_Venta_Taquilla WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Promoción de venta taquilla not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPromocionVentaTaquilla = async (req, res) => {
  try {
    const { promocion_id, venta_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Promociones_Venta_Taquilla (promocion_id, venta_id) VALUES (?, ?)",
      [promocion_id, venta_id]
    );
    res.status(201).json({ id: result.insertId, promocion_id, venta_id });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePromocionVentaTaquilla = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM Promociones_Venta_Taquilla WHERE id = ?", [id]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Promoción de venta taquilla not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePromocionVentaTaquilla = async (req, res) => {
  try {
    const { id } = req.params;
    const { promocion_id, venta_id } = req.body;

    const [result] = await pool.query(
      "UPDATE Promociones_Venta_Taquilla SET promocion_id = ?, venta_id = ? WHERE id = ?",
      [promocion_id, venta_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Promoción de venta taquilla not found" });
    }

    res.json({ id, promocion_id, venta_id });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};