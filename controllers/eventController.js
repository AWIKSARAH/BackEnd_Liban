
import model from '../models/eventModel.js';

const PAGE_SIZE = 5;

function add(req, res, next) {
  let Add = new model(req.body);
  Add.save()
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((err) => {
      res.status(400).send(err.message);
    });
}

async function getAll(req, res, next) {

  try {
    const pageNumber = req.query.page || 1;
    const skipCount = (pageNumber - 1) * PAGE_SIZE;
    // const filter = {confirmation:false };
    const filter = { confirmation: { $eq: false } };
    // const filter = {};
    
    if (req.params.type) {

      filter.typeId = req.params.type;
      console.log(req.params.type);
    }
    if (req.query.title) {
      filter.title = { $regex: `.*${req.query.title}.*`, $options: "i" };
    }

    const totalEvent = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalEvent / PAGE_SIZE);
    console.log(filter);
    const events = await model.find(filter).skip(skipCount).limit(PAGE_SIZE);
    console.log(events);
    return res.status(200).json({
      success: true,
      data: events,
      pageNumber: pageNumber,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getAllNotConf(req, res, next) {

  try {
    const pageNumber = req.query.page || 1;
    const skipCount = (pageNumber - 1) * PAGE_SIZE;
    // const filter = {confirmation:false };
    const filter = { confirmation: { $eq: true } };
    // const filter = {};
    
    if (req.params.type) {

      filter.typeId = req.params.type;
      console.log(req.params.type);
    }
    if (req.query.title) {
      filter.title = { $regex: `.*${req.query.title}.*`, $options: "i" };
    }

    const totalEvent = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalEvent / PAGE_SIZE);
    console.log(filter);
    const events = await model.find(filter).skip(skipCount).limit(PAGE_SIZE);
    console.log(events);
    return res.status(200).json({
      success: true,
      data: events,
      pageNumber: pageNumber,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const event = await model.findOne({ _id: id });
    if (!event) {
      return res.status(404).send({ success: false, error: "Event not found" });
    }
    res.status(200).send({ success: true, event });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}

async function getByTitle(req, res, next) {
  try {
    const title = req.params.title;
    const pageNumber = req.query.page || 1;
    const skipCount = (pageNumber - 1) * PAGE_SIZE;

    const events = await model
      .find({ title: { $regex: title, $options: "i" } })
      .skip(skipCount)
      .limit(PAGE_SIZE);

    const totalEvents = await model.countDocuments({
      title: { $regex: title, $options: "i" },
    });
    const totalPages = Math.ceil(totalEvents / PAGE_SIZE);

    if (!events.length) {
      return res.status(404).send({ success: false, error: "Event not found" });
    }

    res.status(200).send({ success: true, events, pageNumber, totalPages });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
}


function edit(req, res, next) {
  const id = req.params.id;
  const body = req.body;

  model
    .updateOne({ _id: id }, { $set: body })
    .then((response) => {
      if (response.nModified === 0) {
        return res
          .status(404)
          .send({ success: false, message: "No matching document found." });
      }
      res.status(200).send({
        success: true,
        message: "Document updated successfully.",
        body,
        response,
      });
    })
    .catch((err) => {
      return next(err);
    });
}

function Delete(req, res, next) {
  const id = req.params.id;
  model
    .findByIdAndRemove(id)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .send({ success: false, message: "No matching document found." });
      }
      res.status(200).send({
        success: true,
        message: "Document deleted successfully.",
        response,
      });
    })
    .catch((err) => {
      return next(err);
    });
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

const event = { add, getAll, getById, getByTitle, edit, Delete, deleteAll ,getAllNotConf};
export default event;
