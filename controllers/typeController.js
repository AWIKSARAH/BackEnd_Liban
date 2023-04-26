import { NotFoundError } from "../errors.js";
import TypeModel from "../models/typeModel.js";
class TypeController {
  async create(req, res) {
    try {
      const { name, description } = req.body;
      const newType = await TypeModel.create({ name, description });
      res.status(201).json({ success: true, newType });
    } catch (error) {
     next(error);
    }
  }

  async read(req, res) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      TypeModel.paginate({}, { page, limit })
        .then((result) => {
          res.status(200).json({
            success: true,
            data: result,
          });
          if (!result) {
            throw new NotFoundError(`Types not found`);
          }
        })
        .catch((error) => {
          next(error);
        });

  }

  async readOne(req, res) {
    try {
      const { id } = req.params;
      const type = await TypeModel.findById(id);
      if (!type) {
        throw new NotFoundError(`Types not found`);
      }
      res.json({ success: true, type });
    } catch (error) {
      next(error)
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const updatedType = await TypeModel.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      if (!updatedType) {
        throw new NotFoundError(`Types not found`);
      }
      res.json({ success: true, updatedType });
    } catch (error) {
     next(error) 
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedType = await TypeModel.findByIdAndDelete(id);
      if (!deletedType) {
        throw new NotFoundError(`Types not found`);
      }
      res.json({ success: true, deletedType });
    } catch (error) {
     next(error) 
    }
  }
}

export default TypeController;
