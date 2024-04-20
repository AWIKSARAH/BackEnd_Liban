import express from "express";
const router = express.Router();
import controller from "../controllers/newsletterController.js";

 router.post('/' ,controller.create);
 router.get('/' ,controller.get);
 router.delete('/:id' ,controller.deleteNews);
 export default router;