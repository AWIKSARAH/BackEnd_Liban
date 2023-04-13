import express from "express";
import PlaceController from "../controllers/placeController.js";
import uploadImage from "../middleware/HandlingImage.js";

const router = express.Router();
const placeController = new PlaceController();

// Create a new place
router.post(
  "/",
  uploadImage("image", "../uploads/places"),
  placeController.create
);

// Get a place by type
router.get("/places/type/:typeId", placeController.getByTypeId);

// Get a place by ID
router.get("/:id", placeController.readOne);

// Get all places

router.get("/", placeController.read);

// Update a place by ID
router.put(
  "/:id",
  uploadImage("place"),
  placeController.update
);

// Delete a place by ID
router.delete("/:id", placeController.delete);

export default router;
