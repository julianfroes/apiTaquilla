import { pool } from "../db.js";

export const getPromociones = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Promociones");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getPromocion = async (req, res) => {
  try {
    const { id_promocion } = req.params;
    const [rows] = await pool.query("SELECT * FROM Promociones WHERE id = ?", [id_promocion]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Promocion not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createPromocion = async (req, res) => {
  try {
    const { nombre, descripcion, descuento, fecha_inicio, fecha_expiracion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Promociones (nombre, descripcion, descuento, fecha_inicio, fecha_expiracion) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, descuento, fecha_inicio, fecha_expiracion]
    );
    res.status(201).json({ id_promocion: result.insertId, nombre, descripcion, descuento, fecha_inicio, fecha_expiracion});
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deletePromocion = async (req, res) => {
  try {
    const { id_promocion } = req.params;
    const [result] = await pool.query("DELETE FROM Promociones WHERE id = ?", [id_promocion]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Promocion not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updatePromocion = async (req, res) => {
  try {
    const { id_promocion } = req.params;
    const { nombre, descripcion, descuento, fecha_inicio, fecha_expiracion, diaSemana, cantidad, codigo } = req.body;

    const [result] = await pool.query(
      "UPDATE Promociones SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion), descuento = IFNULL(?, descuento), fecha_inicio = IFNULL(?, fecha_inicio), fecha_expiracion = IFNULL(?, fecha_expiracion), dia_semana = IFNULL(?, dia_semana), cantidad = IFNULL(?, cantidad), codigo = IFNULL(?, codigo) WHERE id = ?",
      [nombre, descripcion, descuento, fecha_inicio, fecha_expiracion, diaSemana, cantidad, codigo, id_promocion]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Promocion not found" });

    const [rows] = await pool.query("SELECT * FROM Promociones WHERE id = ?", [id_promocion]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const buscarPromocionActiva = async (req, res) => {
  try {
    const { diaSemana, codigoEspecial } = req.params;

    let query = "SELECT * FROM Promociones WHERE fecha_inicio <= CURDATE() AND fecha_expiracion >= CURDATE()";

    if (diaSemana) {
      query += " AND (dia_semana = ? OR dia_semana IS NULL)";
    }

    if (codigoEspecial) {
      query += " AND (codigo = ? OR codigo IS NULL)";
    }

    const queryParams = [];
    if (diaSemana) {
      queryParams.push(diaSemana);
    }
    if (codigoEspecial) {
      queryParams.push(codigoEspecial);
    }

    const [rows] = await pool.query(query, queryParams);

    if (rows.length > 0) {
      return rows;
    }

    return null;
  } catch (error) {
    throw new Error("Error al buscar la promoción activa");
  }
};
