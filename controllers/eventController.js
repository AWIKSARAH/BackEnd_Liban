import model from '../models/Model_event.js'
const PAGE_SIZE = 5

function add(req, res, next) {
  let Add = new model(req.body)
  Add.save()
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((err) => {
      res.status(400).send(err)
    })
}

// async function getAll(req, res) {
//   try {
//     const pageNumber = req.query.page || 1;
//     const skipCount = (pageNumber - 1) * PAGE_SIZE;

//     const totalEvent= await model.countDocuments();
//     const totalPages = Math.ceil(totalEvent/ PAGE_SIZE);

//     const Event = await model.find().skip(skipCount).limit(PAGE_SIZE);

//     return res.status(200).json({
//       success: true,
//       data: Event,
//       pageNumber: pageNumber,
//       totalPages: totalPages
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// }

async function getAll(req, res) {
  try {
    const filter = {}
    if (req.query.title) {
      filter.title = { $regex: new RegExp('^' + req.query.title, 'i') }
    }
    const pageNumber = parseInt(req.query.page) || 1
    const skipCount = (pageNumber - 1) * PAGE_SIZE

    const event = await model.find(filter).skip(skipCount).limit(PAGE_SIZE)
    const totalevent = await model.countDocuments(filter)
    const totalPages = Math.ceil(totalevent / PAGE_SIZE)

    if (!event.length) {
      return res.status(404).json({
        success: true,
        message: 'No event found',
      })
    }

    res.json({
      success: true,
      data: event,
      pageNumber,
      totalPages,
    })
  } catch (err) {
    res.status(500).send(err)
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

// async function getByTitle(req, res, next) {
//   try {
//     const title = req.query.title
//     const pageNumber = req.query.page || 1
//     const skipCount = (pageNumber - 1) * PAGE_SIZE

//     const events = await model
//       .find({ title: { $regex: title, $options: 'i' } })
//       .skip(skipCount)
//       .limit(PAGE_SIZE)

//     const totalEvents = await model.countDocuments({
//       title: { $regex: title, $options: 'i' },
//     })
//     const totalPages = Math.ceil(totalEvents / PAGE_SIZE)

//     if (!events.length) {
//       return res.status(404).send({ success: false, error: 'Event not found' })
//     }

//     res.status(200).send({ success: true, events, pageNumber, totalPages })
//   } catch (err) {
//     res.status(500).send({ success: false, error: err.message })
//   }
// }

function edit(req, res, next) {
  const id = req.params.id
  const body = req.body

  model
    .updateOne({ _id: id }, { $set: body })
    .then((response) => {
      if (response.nModified === 0) {
        return res
          .status(404)
          .send({ success: false, message: 'No matching document found.' })
      }
      res
        .status(200)
        .send({
          success: true,
          message: 'Document updated successfully.',
          body,
          response,
        })
    })
    .catch((err) => {
      return next(err)
    })
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
      res.status(200).send({
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
    const response = await model.deleteMany()
    res.status(200).send({
      success: true,
      message: 'All documents deleted successfully.',
      response,
    })
  } catch (err) {
    return next(err)
  }
}

const event = { add, getAll, getById, edit, Delete, deleteAll }
export default event
