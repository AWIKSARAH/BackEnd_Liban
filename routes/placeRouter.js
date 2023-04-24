import express from "express";
import placeController from "../controllers/placeController.js";
import uploadImage from "../middleware/imageHandlerMiddleware.js";

const router = express.Router();



// Create a new place
router.post("/", uploadImage("place"), placeController.create);

// Read all places
router.get("/all/:type?", placeController.read);
router.get("/conf/:type?", placeController.getPrivatePlace);
router.get('/latest', placeController.latestPlace)

// Read a place by ID
router.get("/:id", placeController.readOne);

// Update a place by ID
router.put("/:id", uploadImage("place"), placeController.update);
router.patch("/confirm/:id", placeController.updateConfirmationById);

// Delete a place by ID
router.delete("/:id", placeController.delete);

export default router;
