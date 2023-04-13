import express from "express";
const router = express.Router();
import controller from "../controllers/Controller_tag.js";


router.post("/", controller.add);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/name/:name", controller.getByName);
router.patch("/update/:id", controller.edit);
router.delete("/Delete/:id", controller.Delete);





export default router;
