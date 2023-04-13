// routes/types.js
import express from "express";
import TypeController from "../controllers/typeController";

const typeController=new TypeController();
const router = express.Router();

router.get("/", typeController.read);
router.get("/:id", typeController.readOne);
router.post("/", typeController.read);
router.delete("/:id", typeController.delete);
router.put("/:id", typeController.update);

export default router;
