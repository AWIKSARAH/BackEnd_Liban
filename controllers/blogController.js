import Model from "../models/blogModel.js";
import fs from "fs";
const PAGE_SIZE = 5;
import { NotFoundError } from "../errors.js";

class BlogController {
  // Get All Blogs
  async getAllBlogs(req, res,next) {
    const type= req.query.type;
    const title = req.query.title;
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };
    const filters = {};
    try {
      if(type){
        filters.type=type
      }
      if (title) {
        filters.title = { $regex: new RegExp("^" + title, "i") };
      }
      const blogs = await Model.paginate(filters, options);

      if (!blogs.docs.length) {
        if (title) {
          throw new NotFoundError(`No Blog found for ${title}`);
        }
        throw new NotFoundError(`No Blogs found`);
      }

      res.json({
        success: true,
        data: blogs,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get Blog by ID
  async readOne(req, res, next) {
    const { id } = req.params;
    try {
      const blog = await Model.findById(id);
      if (!blog) {
        throw new NotFoundError("Blog with id " + id + " not found");
      }
      res.status(200).send({ success: true, data: blog });
    } catch (error) {
      next(error);
    }
  }

  // New Blog

  async create(req, res, next) {
   
    try {
      const blog = await Model.create(req.body);
      res.status(200).send({ success: true, data: blog });
    } catch (error) {
      next(error);
    }
  }

  // Update Blog By ID
  async update(req, res, next) {
    const { id } = req.params;
    const update = {};

    const { title, description, image ,tags} = req.body;
    if (title) update.title = title;
    if (description) update.description = description;
    if (image) update.image = image;
    if (tags.length > 0) update.tags = tags

    try {
      const blog = await Model.findByIdAndUpdate(
        { _id: id },
        update,
        { new: false }
      );

      if (!blog) {
        throw new NotFoundError("Blog with id" + id + "not found");
      }
      if (req.body.image) {
        fs.unlinkSync(blog.image);
        image = req.file.path;
      }
      res
        .status(200)
        .send({
          success: true,
          message: "The blog has been updated successfully",
          blog,
        });
    } catch (error) {
      next(error);
    }
  }

  // Delete Blog By ID
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const blog = await Model.findOne({ _id: id });
      if (!blog) {
        throw new NotFoundError("Blog with id" + id + "not found");
      }
      // if (image) {
        // fs.unlinkSync(blog.image);
      // }
      await Model.findByIdAndDelete({ _id: id });
      res
        .status(200)
        .send({ success: true, message: "Blog has been deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

const blogController = new BlogController();
export default blogController;
