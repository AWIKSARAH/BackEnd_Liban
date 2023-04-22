import Model from "../models/blogModel.js";
import fs from "fs";
const PAGE_SIZE = 5;

class BlogController {
  // Get All Blogs
  async getAllBlogs(req, res) {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };
    const filters = {};
    try {
      if (req.query.title) {
        filters.title = { $regex: new RegExp("^" + req.query.title, "i") }
      }
      const blogs = await Model.paginate(filters, options);

      if (!blogs.docs.length) {
        if (req.query.title) {
          return res.status(404).json({
            success: true,
            message: `No Blog found for ${req.query.title}`,
          });
        }
        return res.status(404).json({
          success: true,
          message: "No Blog found",
        });
      }

      res.json({
        success: true,
        data: blogs,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }



  // Get Blog by ID
  async getBlogById(req, res, next) {
    const { id } = req.params;
    try {
      const blog = await Model.findOne({ _id: id });
      if (!blog) {
        return res
          .status(404)
          .send({ success: true, message: "Blog not found" });
      }
      res.status(200).send({ success: true, blog });
    } catch (err) {
      next(err);
    }
  }

  // New Blog
  async newBlog(req, res, next) {
    const { title, description } = req.body;
    // let image = "";
    // if (req.file) {
    const image = req.body.image;
    // }
    try {
      const blog = await Model.create({ title, description, image });
      res.status(200).send({ success: true, blog });
    } catch (err) {
      next(err);
    }
  }

  // Update Blog By ID
  async updateBlog(req, res, next) {
    const { id } = req.params;
    const { title, description } = req.body;
    let image = "";
    try {
      const blog = await Model.findOne({ _id: id });
      if (!blog) {
        return res
          .status(404)
          .send({ success: true, message: "Blog not found" });
      }
      if (req.file) {
        fs.unlinkSync(blog.image);
        image = req.file.path;
      } else {
        image = blog.image;
      }
      const updatedBlog = await Model.findByIdAndUpdate(
        { _id: id },
        { title, description, image },
        { new: true }
      );
      res
        .status(200)
        .send({
          success: true,
          message: "The blog has been updated successfully",
          blog: updatedBlog,
        });
    } catch (err) {
      next(err);
    }
  }

  // Delete Blog By ID
  async deleteBlog(req, res, next) {
    const { id } = req.params;
    try {
      const blog = await Model.findOne({ _id: id });
      if (!blog) {
        return res
          .status(404)
          .send({ success: true, message: "Blog not found" });
      }
      if (blog.image) {
        fs.unlinkSync(blog.image);
      }
      await Model.findByIdAndDelete({ _id: id });
      res
        .status(200)
        .send({
          success: true,
          message: "This blog has been deleted successfully",
        });
    } catch (err) {
      next(err);
    }
  }
}

const blogController = new BlogController();
export default blogController;
