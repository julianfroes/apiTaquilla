import { pool } from "../db.js";

export const getDetalles = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Detalles_Venta_Taquilla");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getDetalle = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    const [rows] = await pool.query("SELECT * FROM Detalles_Venta_Taquilla WHERE id_detalle = ?", [id_detalle]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Detalle not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createDetalle = async (req, res) => {
  try {
    const { cantidad, area, precio_total, venta_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Detalles_Venta_Taquilla (cantidad, area, precio_total, venta_id) VALUES (?, ?, ?, ?)",
      [cantidad, area, precio_total, venta_id]
    );
    res.status(201).json({ id_detalle: result.insertId, cantidad, area, precio_total, venta_id});
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteDetalle = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    const [result] = await pool.query("DELETE FROM Detalles_Venta_Taquilla WHERE id_detalle = ?", [id_detalle]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Detalle not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateDetalle = async (req, res) => {
  try {
    const { id_detalle } = req.params;
    const { cantidad, area, precio_total, venta_id } = req.body;

    const [result] = await pool.query(
      "UPDATE Detalles_Venta_Taquilla SET cantidad = IFNULL(?, cantidad), area = IFNULL(?, area), precio_total = IFNULL(?, precio_total), venta_id = IFNULL(?, venta_id) WHERE id_detalle = ?",
      [cantidad, area, precio_total, venta_id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Detalle not found" });

    const [rows] = await pool.query("SELECT * FROM Detalles_Venta_Taquilla WHERE id_detalle = ?", [id_detalle]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};