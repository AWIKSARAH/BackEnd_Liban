import express from "express";
import controller from "../controllers/eventController.js";

const router = express.Router();

router.post("/", controller.add);

router.get("/all/:type?", controller.getAll);
router.get("/conf/:type?", controller.getPrivateEvent);
router.get("/:id", controller.getById);

router.patch("/confirm/:id", controller.updateConfirmationById);
router.patch("/update/:id", controller.edit);

router.delete("/Delete/:id", controller.Delete);
router.delete("/Delete/sure/yes", controller.deleteAll);

export default router;