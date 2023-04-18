import express from "express";
import imageUpload from "../midlleware/upload.js";
import controller from "../controllers/controller_blog.js";

const router = express.Router();
// GET /blog
router.get ('/', controller.getAllBlogs)


// POST /blog
router.post('/', imageUpload.single('image'), controller.newBlog);


// GET /blog/:blogId
router.get('/:blogId', controller.getBlogById);
// PUT /blog/:blogId
router.put('/:blogId', imageUpload.single('image'), controller.updateBlog);

// DELETE /blos/:blogId
router.delete("/:blogId", controller.deleteBlog);

export default router;