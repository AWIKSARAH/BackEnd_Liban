import express from "express";
import imageUpload from "../middleware/HandlingImage.js";
import controller from "../controllers/blogController.js";

const router = express.Router();
// GET /blog
router.get ('/', controller.getAllBlogs)


// POST /blog
router.post('/', imageUpload('blog'), controller.newBlog);


// GET /blog/:Id
router.get('/:id', controller.getBlogById);
// PUT /blog/:Id
router.put('/:id', imageUpload('blog'), controller.updateBlog);

// DELETE /blog/:Id
router.delete("/:id", controller.deleteBlog);

export default router;