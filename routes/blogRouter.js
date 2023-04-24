import express from "express";
import imageUpload from "../middleware/imageHandlerMiddleware.js";
import controller from "../controllers/blogController.js";

const router = express.Router();


// GET /blog
router.get ('/', controller.getAllBlogs);
// , imageUpload('blog')
// POST /blog
router.post('/',imageUpload('blog'),controller.create);


// , imageUpload('blog')
// GET /blog/:Id
router.get('/:id',controller.readOne);
// PUT /blog/:Id
router.put('/:id', imageUpload('blog'), controller.update);

// DELETE /blog/:Id
router.delete("/:id", controller.delete);

export default router;