import { Router } from "express";
import {
  createPromocionVentaTaquilla,
  deletePromocionVentaTaquilla,
  getPromocionVentaTaquilla,
  getPromocionesVentaTaquilla,
  updatePromocionVentaTaquilla,
} from "../controllers/promocionesVentaTaquilla.controller.js";

const router = Router();

// GET all Promociones de Venta Taquilla
router.get("/promociones-venta-taquilla", getPromocionesVentaTaquilla);

// GET A Promoción de Venta Taquilla
router.get("/promociones-venta-taquilla/:id", getPromocionVentaTaquilla);

// DELETE A Promoción de Venta Taquilla
router.delete("/promociones-venta-taquilla/:id", deletePromocionVentaTaquilla);

// INSERT A Promoción de Venta Taquilla
router.post("/promociones-venta-taquilla", createPromocionVentaTaquilla);

// UPDATE A Promoción de Venta Taquilla
router.patch("/promociones-venta-taquilla/:id", updatePromocionVentaTaquilla);

export default router;