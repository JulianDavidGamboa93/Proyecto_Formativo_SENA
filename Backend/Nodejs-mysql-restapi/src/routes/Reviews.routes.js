import { Router } from "express";
import {
  getReviews,
  createReviews,
  updateReviews,
  deleteReviews,
  getReviews_id,
} from "../controllers/Reviews.controller.js";

const router = Router();

router.get("/Reviews", getReviews);

router.get("/Reviews/:ID_Reviews", getReviews_id);

router.post("/Reviews", createReviews);

router.patch("/Reviews/:ID_Reviews", updateReviews);

router.delete("/Reviews/:ID_Reviews", deleteReviews);

export default router;