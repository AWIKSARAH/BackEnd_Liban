import fileController from "../controllers/fileController.js";
import { Router } from "express";
import uploadImage from "../middleware/imageHandlerMiddleware.js";

const router = Router()

router.post('/place',uploadImage('place'),fileController.post)
router.post('/blog',uploadImage('blog'),fileController.post)
router.post('/event',uploadImage('event'),fileController.post)

export default router