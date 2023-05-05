import express from "express";
import placeController from "../controllers/placeController.js";
import uploadImage from "../middleware/imageHandlerMiddleware.js";
import requiredAuth from "../middleware/jwtAuthenticationMiddleware.js";

const router = express.Router();

// Create a new place
router.post("/", placeController.create);

// Read all places
router.get("/all", placeController.read);
router.get("/all/all", requiredAuth, placeController.readAll);
router.get("/conf/", requiredAuth, placeController.getPrivatePlace);
router.get("/latest", placeController.latestPlace);

// Read a place by ID
router.get("/:id", placeController.readOne);

// Update a place by ID
router.put("/:id", requiredAuth, placeController.update);
router.patch(
  "/confirm/:id",
  requiredAuth,
  placeController.updateConfirmationById
);

// Delete a place by ID
router.delete("/:id", requiredAuth, placeController.delete);

export default router;
