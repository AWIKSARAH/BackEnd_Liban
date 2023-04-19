import Model from "../models/blogModel.js";
import fs from "fs";
// import path from "path";

class Controller {
  // Get All Blogs
  async getAllBlogs(req, res) {
    try {
      const blogs = await Model.find({});
      if (!blogs.length) {
        return res.status(404).send({ success: true, message: "No blogs found" });
      }
      res.json(blogs);
    } catch (err) {
      res.status(500).send(err);
    }
  }



  async  getByTitle(req, res, next) {
    try {
      const title = req.query.title;
      const pageNumber = req.query.page || 1;
      const skipCount = (pageNumber - 1) * PAGE_SIZE;
  
      const events = await model
        .find({ title: { $regex: title, $options: "i" } })
        .skip(skipCount)
        .limit(PAGE_SIZE);
  
      const totalblog = await Model.countDocuments({ title: { $regex: title, $options: "i" } });
      const totalPages = Math.ceil(totalblog / PAGE_SIZE);
  
      if (!events.length) {
        return res.status(404).send({ success: false, error: 'Event not found' })
      }
  
      res.status(200).send({ success: true, events, pageNumber, totalPages });
    } catch (err) {
      res.status(500).send({ success: false, error: err.message })
    }
  }
  





  // Get Blog by ID
  async getBlogById(req, res, next) {
    const { id } = req.params;
    try {
      const blog = await Model.findOne({ _id: id });
      if (!blog) {
        return res.status(404).send({ success: true, message: "Blog not found" });
      }
      res.status(200).send({ success: true, blog });
    } catch (err) {
      next(err);
    }
  }

  // New Blog
  async newBlog(req, res, next) {
    const { title, description } = req.body;
    let image = "";
    if (req.file) {
      image = req.file.path;
    }
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
        return res.status(404).send({ success: true, message: "Blog not found" });
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
      res.status(200).send({ success: true, message: "The blog has been updated successfully", blog: updatedBlog });
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
        return res.status(404).send({ success: true, message: "Blog not found" });
      }
      if (blog.image) {
        fs.unlinkSync(blog.image);
      }
      await Model.findByIdAndDelete({ _id: id });
      res.status(200).send({ success: true, message: "This blog has been deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

const controller = new Controller();
export default controller;