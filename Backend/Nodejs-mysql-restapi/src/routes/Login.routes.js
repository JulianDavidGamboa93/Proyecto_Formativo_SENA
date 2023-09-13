import { Router } from "express";
import {
  getUsuarios,
  createUsuarios,
  updateUsuarios,
  deleteUsuarios,
} from "../controllers/Login.controllers.js";

const router = Router();

router.get("/Login", getUsuarios);

router.post("/Login", createUsuarios);

router.put("/Login", updateUsuarios);

router.delete("/Login", deleteUsuarios);

export default router;
