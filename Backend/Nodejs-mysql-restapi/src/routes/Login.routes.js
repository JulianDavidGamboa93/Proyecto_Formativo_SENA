import { Router } from "express";
import {
  getUsuarios,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios,
  getUsurio_id,
} from "../controllers/Login.controllers.js";

const router = Router();

router.get("/Login", getUsuarios);

router.get("/Login/:ID_Login", getUsurio_id);

router.post("/Login", createUsuarios);

router.patch("/Login/:ID_Login", updateUsuarios);

router.delete("/Login/:ID_Login", deleteUsuarios);

export default router;
