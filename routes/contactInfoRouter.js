import express from "express";
import {
  get,
  create,
  updateContact,
} from "../controllers/contactInfoController.js";
import auth from "../middleware/jwtAuthenticationMiddleware.js";

// import isAdminOrSuperAdmin from '../middleware/adminAuthenticaitonMiddleware.js';
import uploadImage from "../middleware/imageHandlerMiddleware.js";
import test from "../middleware/bodyTesterMiddleware.js";
const router = express.Router();

router.get("/", get);
router.patch("/:id",test, uploadImage("logo"), updateContact);

export default router;

