import { Router } from "express";
import {
  createDetalle,
  deleteDetalle,
  getDetalle,
  getDetalles,
  updateDetalle,
} from "../controllers/detallesVenta.controller.js";

const router = Router();

// GET all Detalles
router.get("/detalles", getDetalles);

// GET A Detalle
router.get("/detalles/:id_detalle", getDetalle);

// DELETE A Detalle
router.delete("/detalles/:id_detalle", deleteDetalle);

// INSERT A Detalle
router.post("/detalles", createDetalle);

// UPDATE A Detalle
router.patch("/detalles/:id_detalle", updateDetalle);

export default router;