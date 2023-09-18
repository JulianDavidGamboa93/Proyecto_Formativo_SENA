import { Router } from "express";
import {
  getCart,
  createCart,
  updateCart,
  deleteCart,
  getCart_id,
} from "../controllers/Cart.controller.js";

const router = Router();

router.get("/Cart", getCart);

router.get("/Cart/:ID_Cart", getCart_id);

router.post("/Cart", createCart);

router.patch("/Cart/:ID_Cart", updateCart);

router.delete("/Cart/:ID_Cart", deleteCart);

export default router;
