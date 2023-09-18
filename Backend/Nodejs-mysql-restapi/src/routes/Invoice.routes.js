import { Router } from "express";
import {
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoice_id,
} from "../controllers/Invoice.controller.js";

const router = Router();

router.get("/Invoice", getInvoice);

router.get("/Invoice/:ID_Invoice", getInvoice_id);

router.post("/Invoice", createInvoice);

router.patch("/Invoice/:ID_Invoice", updateInvoice);

router.delete("/Invoice/:ID_Invoice", deleteInvoice);

export default router; 