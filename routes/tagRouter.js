import express from "express";
const router = express.Router();
import controller from "../controllers/tagController.js";


router.post("/", controller.add);
router.get("/", controller.getAll);
router.get("/name/:name", controller.getByName);
router.get("/:id", controller.getById);
router.patch("/:id", controller.edit);
router.delete("/:id", controller.Delete);
// router.delete("/Delete/sure/yes", controller.deleteAll);






export default router;
