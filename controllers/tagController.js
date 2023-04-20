
import model from "../models/tagModel.js";
const PAGE_SIZE =5;

function add(req, res, next) {
  let Add = new model(req.body)
  Add.save()
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((err) => {
      res.status(400).send(err)
    })
}




async function getAll(req, res) {
  const filter = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try { 
    if (req.query.name) {
      filter.name = { $regex: new RegExp("^" + req.query.name, "i") };
    }
   model.paginate(filter, { page, limit }).then((result) => {
      res.status(200).json({
        success: true,
        data: result,
        
      });
      if (!result) {
          return res.status(404).json({
            success: false,
            error: "No Tags found",
          });
        }
    }).catch((error) => {
      res.status(500).send({ success: false,
        error:error});
    });
    
  } catch (err) {
    res.status(500).send({ success: false,
      error:err});
  }
}






async function getById(req, res, next) {
  try {
    const id = req.params.id
    const event = await model.findOne({ _id: id })
    if (!event) {
      return res.status(404).send({ success: false, error: 'Event not found' })
    }
    res.status(200).send({ success: true, event })
  } catch (err) {
    res.status(500).send({ success: false, error: err.message })
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
      return res.status(404).send({ success: false, error: 'Tag not found' })
    }

    res.status(200).send({ success: true, tag, pageNumber, totalPages });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message })
  }
}






function edit(req, res, next) {
  const id = req.params.id;
  const body = req.body;
console.log(body);
  model.updateOne({ _id: id }, { $set: body })
    .then(response => {
      if (response.nModified === 0) {
        return res.status(404).send({ success: false, message: "No matching document found." });
      }
      res.status(200).send({ success: true, message: "Document updated successfully.",body, response });
    })
    .catch(err => {
      return next(err);
    });
}

function Delete(req, res, next) {
  const id = req.params.id
  model
    .findByIdAndRemove(id)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .send({ success: false, message: 'No matching document found.' })
      }
      res
        .status(200)
        .send({
          success: true,
          message: 'Document deleted successfully.',
          response,
        })
    })
    .catch((err) => {
      return next(err)
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
  } catch (err) {
    return next(err);
  }
}



const event = { add, getAll, getById, getByName, edit, Delete,deleteAll }
export default event
