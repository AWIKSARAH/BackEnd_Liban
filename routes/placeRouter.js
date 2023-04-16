import express from "express";
import PlaceController from "../controllers/placeController.js";
import uploadImage from "../middleware/HandlingImage.js";

const router = express.Router();
const placeController = new PlaceController();

// Create a new place
router.post("/", uploadImage("place"), placeController.create);

// place by type
router.get("/places/type/:typeId", placeController.readByTypeId);

// Read a place by ID
router.get("/:id", placeController.readOne);

// Read all places

router.get("/", placeController.read);

// Update a place by ID
router.put("/:id", uploadImage("place"), placeController.update);

// Delete a place by ID
router.delete("/:id", placeController.delete);

export default router;
