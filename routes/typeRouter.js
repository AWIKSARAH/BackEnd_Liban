import express from "express";
import TypeController from "../controllers/typeController.js";

const typeController = new TypeController();

const router = express.Router();

// Read all types
router.get("/", typeController.read);        

// Read a single type by id
router.get("/:id", typeController.readOne);  

// Create a new type
router.post("/", typeController.create);     

// Delete a type by id
router.delete("/:id", typeController.delete);

// Update a type by id
router.put("/:id", typeController.update);   

export default router;
