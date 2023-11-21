CREATE DATABASE IF NOT EXISTS taquillazoo;

USE taquillazoo;

CREATE TABLE Venta_Taquilla(
    id_venta INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    precio_total FLOAT,
    fecha DATE,
    email VARCHAR(40),
    celular VARCHAR(10),
    id_vendedor INT,
    id_cliente INT
);

CREATE TABLE Detalles_Venta_Taquilla(
    id_detalle INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cantidad INT,
    area VARCHAR(75),
    precio_total FLOAT,
    venta_id INT FOREIGN KEY REFERENCES Venta_Taquilla(id_venta)
);

CREATE TABLE Promociones(
    id_promocion INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50),
    descripcion VARCHAR(200),
    descuento FLOAT, 
    fecha_inicio DATE,
    fecha_expiracion DATE
);

DESCRIBE Venta_Taquilla;

INSERT INTO Venta_Taquilla (precio_total, fecha, email, celular, id_vendedor, id_cliente)
VALUES (100.50, '2023-11-12', 'cliente1@example.com', '1234567890', 1, 101),
VALUES (75.20, '2023-11-13', 'cliente2@example.com', '9876543210', 2, 102),
VALUES (120.75, '2023-11-14', 'cliente3@example.com', '5551112222', 3, 103);

SELECT * FROM Venta_Taquilla;