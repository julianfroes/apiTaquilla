import { pool } from "../db.js";

export const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Venta_Taquilla");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getVenta = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const [rows] = await pool.query("SELECT * FROM Venta_Taquilla WHERE id_venta = ?", [id_venta]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Venta not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteVenta = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const [result] = await pool.query("DELETE FROM Venta_Taquilla WHERE id_venta = ?", [id_venta]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Venta not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createVenta = async (req, res) => {
  try {
    const { precio_total, fecha, email, celular, id_vendedor, id_cliente } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Venta_Taquilla (precio_total, fecha, email, celular, id_vendedor, id_cliente) VALUES (?, ?, ?, ?, ?, ?)",
      [precio_total, fecha, email, celular, id_vendedor, id_cliente]
    );
    res.status(201).json({ id_venta: result.insertId, precio_total, fecha, email, celular, id_vendedor, id_cliente });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateVenta = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const { precio_total, fecha, email, celular, id_vendedor, id_cliente } = req.body;

    const [result] = await pool.query(
      "UPDATE Venta_Taquilla SET precio_total = IFNULL(?, precio_total), fecha = IFNULL(?, fecha), email = IFNULL(?, email), celular = IFNULL(?, celular), id_vendedor = IFNULL(?, id_vendedor), id_cliente = IFNULL(?, id_cliente) WHERE id_venta = ?",
      [precio_total, fecha, email, celular, id_vendedor, id_cliente, id_venta]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Venta not found" });

    const [rows] = await pool.query("SELECT * FROM Venta_Taquilla WHERE id_venta = ?", [id_venta]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};