import { Router } from "express";

const routers=Router();

routers.get("/", (request, response) => {
    res.send("Jdgamboa");
})

export default router;