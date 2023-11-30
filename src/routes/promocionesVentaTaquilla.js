import { Router } from "express";
import {
  createPromocionVentaTaquilla,
  deletePromocionVentaTaquilla,
  getPromocionVentaTaquillaById,
  getPromocionesVentaTaquilla,
  updatePromocionVentaTaquilla,
} from "../controllers/promocionesVentasTaquilla.controller.js";

const router = Router();

// GET all Promociones de Venta Taquilla
router.get("/promociones-venta-taquilla", getPromocionesVentaTaquilla);

// GET A Promoción de Venta Taquilla
router.get("/promociones-venta-taquilla/:id", getPromocionVentaTaquillaById);

// DELETE A Promoción de Venta Taquilla
router.delete("/promociones-venta-taquilla/:id", deletePromocionVentaTaquilla);

// INSERT A Promoción de Venta Taquilla
router.post("/promociones-venta-taquilla", createPromocionVentaTaquilla);

// UPDATE A Promoción de Venta Taquilla
router.patch("/promociones-venta-taquilla/:id", updatePromocionVentaTaquilla);

export default router;