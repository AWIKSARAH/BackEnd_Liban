

import model from '../models/Model_event.js';


function add(req, res, next) {
  let Add = new model(req.body)
  Add.save()
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((err) => {
      res.status(400).send(err)
    })
}  

 
async function getAll(req, res, next) {
  try {
    const Event = await model.find({})
    res.status(200).send({ success: true, Event })
  } catch (err) {
    res.status(500).send({ success: false, err: err })
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

async function getByTitle(req, res, next) {
  try {
    const title = req.params.title
   
    const event = await model.findOne({ title: title })
    if (!event) {
      return res.status(404).send({ success: false, error: 'Event not found' })
    }
    res.status(200).send({ success: true, event })
  } catch (err) {
    res.status(500).send({ success: false, error: err.message })
  }
}

function edit(req, res, next) {
  const id = req.params.id;
  const body = req.body;

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

const event = { add, getAll, getById, getByTitle, edit, Delete }
export default event
