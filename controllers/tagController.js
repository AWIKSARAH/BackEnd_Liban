
import { NotFoundError } from "../errors.js";
import model from "../models/tagModel.js";
const PAGE_SIZE =5;

function add(req, res, next) {
  let Add = new model(req.body)
  Add.save()
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((error) => {
      next(error)
    })
}




async function getAll(req, res) {
  const filter = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
    if (req.query.name) {
      filter.name = { $regex: new RegExp("^" + req.query.name, "i") };
    }
   model.paginate(filter, { page, limit }).then((result) => {
      res.status(200).json({
        success: true,
        data: result,
        
      });
      if (!result) {
          throw new NotFoundError("No tags found")
        }
    }).catch((error) => {
      next(error)
    });
    
}






async function getById(req, res, next) {
  try {
    const id = req.params.id
    const tag = await model.findOne({ _id: id })
    if (!tag) {
      throw new NotFoundError(`Tag ${id} not found`)
    }
    res.status(200).send({ success: true, tag })
  } catch (error) {
next(error)
  }
}





async function getByName(req, res, next) {
  try {
    const name = req.params.name;
    const pageNumber = req.query.page || 1;
    const skipCount = (pageNumber - 1) * PAGE_SIZE;

    const tag = await model
      .find({ name: { $regex: name, $options: "i" } })
      .skip(skipCount)
      .limit(PAGE_SIZE);

    const totalTag = await model.countDocuments({ name: { $regex: name, $options: "i" } });
    const totalPages = Math.ceil(totalTag / PAGE_SIZE);

    if (!tag.length) {
      throw new NotFoundError(`Tag ${name} does not exist`)
    }

    res.status(200).send({ success: true, tag, pageNumber, totalPages });
  } catch (error) {
    next(error)
  }
}






function edit(req, res, next) {
  const id = req.params.id;
  const body = req.body;
console.log(body);
  model.updateOne({ _id: id }, { $set: body })
    .then(response => {
      if (response.nModified === 0) {
        throw new NotFoundError(`Tag ${id} does not exist`)
      }
      res.status(200).send({ success: true, message: "Document updated successfully.",body, response });
    })
    .catch(error => {
      next(error);
    });
}

function Delete(req, res, next) {
  const id = req.params.id
  model
    .findByIdAndRemove(id)
    .then((response) => {
      if (!response) {
        throw new NotFoundError(`Tag ${id} not found`) }
      res
        .status(200)
        .send({
          success: true,
          message: 'Document deleted successfully.',
          response,
        })
    })
    .catch((error) => {
      next(error)
    })
}



async function deleteAll(req, res, next) {
  try {
    const response = await model.deleteMany();
    res.status(200).send({
      success: true,
      message: "All documents deleted successfully.",
      response,
    });
  } catch (error) {
    next(error);
  }
}



const event = { add, getAll, getById, getByName, edit, Delete,deleteAll }
export default event
