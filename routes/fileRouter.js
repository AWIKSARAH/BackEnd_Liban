import fileController from "../controllers/fileController.js";
import { Router } from "express";
import uploadImage from "../middleware/imageHandlerMiddleware.js";

const router = Router()

router.post('/',uploadImage('place'),fileController.post)

export default router