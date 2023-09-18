import { Router } from "express";
import {
  getItems,
  createItems,
  updateItems,
  deleteItems,
  getItems_id,
} from "../controllers/Products.controller.js";

const router = Router();

router.get("/Products", getItems);

router.get("/Products/:ID_Products", getItems_id);

router.post("/Products", createItems);

router.patch("/Products/:ID_Products", updateItems);

router.delete("/Products/:ID_Products", deleteItems);

export default router;



    
    