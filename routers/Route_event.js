import express from "express";
const router = express.Router();
import controller from "../controllers/Controller_event.js";




router.post("/", controller.add);
// router.post("/add",  controller.createAdmin);
// router.patch("/:id",  controller.edit);
// router.delete("/:id",  controller.Delete);

export default router;
