import express from "express";
import controller from "../controllers/eventController.js";

const router = express.Router();

router.post("/", controller.add);
<<<<<<< HEAD:routes/eventRouter.js
router.get("/all/:type?", controller.getAll);
router.get("/conf/:type?", controller.getAllNotConf);
router.get("/title/:title", controller.getByTitle);
router.get("/:id", controller.getById);
=======
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
// router.get("/title/:title", controller.getByTitle);
>>>>>>> taleb_documentation:routes/Route_event.js
router.patch("/update/:id", controller.edit);
router.delete("/Delete/:id", controller.Delete);
router.delete("/Delete/sure/yes", controller.deleteAll);

// router.patch('/confirm/:id', controller);
// router.get("/conf", controller.getAll);getAllNotConf


export default router;
