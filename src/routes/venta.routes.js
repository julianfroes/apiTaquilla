import { Router } from "express";
import {
  createVenta,
  deleteVenta,
  getVenta,
  getVentas,
  updateVenta,
} from "../controllers/venta.controller.js";

const router = Router();

// GET all Ventas
router.get("/ventas", getVentas);

// GET A Venta
router.get("/ventas/:id_venta", getVenta);

// DELETE A Venta
router.delete("/ventas/:id_venta", deleteVenta);

// INSERT A Venta
router.post("/ventas", createVenta);

// UPDATE A Venta
router.patch("/ventas/:id_venta", updateVenta);

export default router;