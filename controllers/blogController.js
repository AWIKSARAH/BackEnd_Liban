import Model from "../models/blogModel.js";
import fs from "fs";
const PAGE_SIZE = 5;
import { NotFoundError } from '../errors.js';

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
        throw new NotFoundError( `No Blog found for ${req.query.title}`);
        }
        throw new NotFoundError( `No Blogs found`);

      

      res.json({

        success: true,
        data: blogs,
      });
    } catch (err) {
      next(err);
    }
  }



  // Get Blog by ID
  async readOne(req, res, next) {
    const { id } = req.params;
    try {
      const blog = await Model.findOne({ _id: id });
      if (!blog) {

        throw new NotFoundError('Blog with id ' + id + ' not found');
      }
      res.status(200).send({ success: true,data: blog });
    } catch (err) {
      next(err);
    }
  }

  // New Blog

  async create(req, res, next) {
    const { title, description, image } = req.body;
    try {
      const blog = await Model.create({ title, description, image });
      res.status(200).send({ success: true,data: blog });
    } catch (err) {
      next(err);
    }
  }

  // Update Blog By ID
  async update(req, res, next) {
    const { id } = req.params;
    const update = {}

    const { title, description ,image} = req.body;
    if (title) update.title = title;
    if (description) update.description = description;
    if(image) update.image = image;

    try {


      
      const blog = await Model.findByIdAndUpdate(
        { _id: id },
        { title, description, image },
        { new: false }
      );

      if(!blog){
        throw new NotFoundError('Blog with id'+ id +'not found');
      }
      if (req.body.image) {
        fs.unlinkSync(blog.image);
        image = req.file.path;
      }
      res.status(200).send({ success: true, message: "The blog has been updated successfully", blog });
    } catch (err) {
      next(err);
    }
  }

  // Delete Blog By ID
  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const blog = await Model.findOne({ _id: id });
      if (!blog) {
       throw new NotFoundError('Blog with id'+ id +'not found');
      }
      if (blog.image) {
        fs.unlinkSync(blog.image);
      }
      await Model.findByIdAndDelete({ _id: id });
      res.status(200).send({ success: true, message: "Blog has been deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

const blogController = new BlogController();
export default blogController;
