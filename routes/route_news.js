import express from "express";
const router = express.Router();
import controller from "../controllers/controller_newsletter.js";




 router.post('/' ,controller.create);
 router.get('/' ,controller.get);
 export default router;