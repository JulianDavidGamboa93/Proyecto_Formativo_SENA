import { Router } from "express";
import {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    getUsers_id,
  } from "../controllers/Users.controllers.js";

  const router = Router();

router.get("/Users", getUsers);

router.get("/Users/:ID_Users", getUsers_id);

router.post("/Users", createUsers);

router.patch("/Users/:ID_Users", updateUsers);

router.delete("/Users/:ID_Users", deleteUsers);

export default router;