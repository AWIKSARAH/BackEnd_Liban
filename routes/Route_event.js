import express from "express";
import controller from "../controllers/Controller_event.js";

const router = express.Router();




router.post("/", controller.add);
router.get("/:id", controller.getById);
router.get("/title/:title", controller.getByTitle);
router.patch("/update/:id", controller.edit);
router.delete("/Delete/:id", controller.Delete);
router.delete("/Delete/sure/yes", controller.deleteAll);

// router.patch('/confirm/:id', controller);
// router.get("/conf", controller.getAll);
router.get("/", controller.getAll);




export default router;
