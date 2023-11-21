import { Router } from "express";
import {
  createPromocion,
  deletePromocion,
  getPromocion,
  getPromociones,
  updatePromocion,
} from "../controllers/promocion.controller.js";

const router = Router();

// GET all Promociones
router.get("/promocion", getPromociones);

// GET A Promocion
router.get("/promocion/:id_promocion", getPromocion);

// DELETE A Promocion
router.delete("/promocion/:id_promocion", deletePromocion);

// INSERT A Promocion
router.post("/promocion", createPromocion);

// UPDATE A Promocion
router.patch("/promocion/:id_promocion", updatePromocion);

export default router;