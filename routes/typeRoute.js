// routes/types.js
import express from "express";
import { createType, getTypes } from "../controllers/typeController.js";

const router = express.Router();

router.get("/", getTypes);
router.post("/", createType);

export default router;
