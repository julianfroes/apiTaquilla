USE taquillazoo;
DELIMITER $$

CREATE PROCEDURE `ventaTaquillaAddOrEdit` (
  IN _id_venta INT,
  IN _precio_total FLOAT,
  IN _fecha DATE,
  IN _email VARCHAR(40),
  IN _celular VARCHAR(10),
  IN _id_vendedor INT,
  IN _id_cliente INT
)
BEGIN 
  IF _id_venta = 0 THEN
    -- Nuevo registro
    INSERT INTO Venta_Taquilla (precio_total, fecha, email, celular, id_vendedor, id_cliente)
    VALUES (_precio_total, _fecha, _email, _celular, _id_vendedor, _id_cliente);

    SET _id_venta = LAST_INSERT_ID();
  ELSE
    -- Actualizar registro existente
    UPDATE Venta_Taquilla
    SET
      precio_total = _precio_total,
      fecha = _fecha,
      email = _email,
      celular = _celular,
      id_vendedor = _id_vendedor,
      id_cliente = _id_cliente
    WHERE id_venta = _id_venta;
  END IF;

  SELECT _id_venta AS 'id_venta';
END $$

DELIMITER ;