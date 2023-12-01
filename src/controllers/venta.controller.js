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
    const [rows] = await pool.query("SELECT * FROM Venta_Taquilla WHERE id = ?", [id_venta]);

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
    const [result] = await pool.query("DELETE FROM Venta_Taquilla WHERE id = ?", [id_venta]);

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
    const { precio_total, fecha, email, celular, id_vendedor, id_cliente, detalles } = req.body;
    // Insertar en Venta_Taquilla
    const [resultVenta] = await pool.query(
      "INSERT INTO Venta_Taquilla (precio_total, fecha, email, celular, id_vendedor, id_cliente) VALUES (?, ?, ?, ?, ?, ?)",
      [precio_total, fecha, email, celular, id_vendedor, id_cliente]
    );

    const ventaId = resultVenta.insertId;

    // Crear registro en Detalles_Venta_Taquilla relacionado con la venta recién creada
    for (const detalle of detalles) {
      const { cantidad, area, precio_total, tipo_boleto } = detalle;
      await pool.query(
        "INSERT INTO Detalles_Venta_Taquilla (cantidad, area, precio_total, tipo_boleto, venta_id) VALUES (?, ?, ?, ?, ?)",
        [cantidad, area, precio_total, tipo_boleto, ventaId]
      );
    }

    res.status(201).json({ ventaId, message: "Venta creada con detalles de venta" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateVenta = async (req, res) => {
  try {
    const { id_venta } = req.params;
    const { precio_total, fecha, email, celular, id_vendedor, id_cliente } = req.body;

    const [result] = await pool.query(
      "UPDATE Venta_Taquilla SET precio_total = IFNULL(?, precio_total), fecha = IFNULL(?, fecha), email = IFNULL(?, email), celular = IFNULL(?, celular), id_vendedor = IFNULL(?, id_vendedor), id_cliente = IFNULL(?, id_cliente) WHERE id = ?",
      [precio_total, fecha, email, celular, id_vendedor, id_cliente, id_venta]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Venta not found" });

    const [rows] = await pool.query("SELECT * FROM Venta_Taquilla WHERE id = ?", [id_venta]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};