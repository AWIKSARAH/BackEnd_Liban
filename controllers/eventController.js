import model from "../models/eventModel.js";
const PAGE_SIZE = 5;

function add(req, res, next) {
  let Add = new model(req.body);
  Add.save()
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((err) => {
      if (error.name === "ValidationError") {
        const errors = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        errors.status = 422;
        return res.status(422).json({ success: false, errors });
      }
      res.status(400).send(err);
    });
}


async function getPrivateEvent(req, res) {
  try {
    const filter = {confirmation: false};
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    if (req.params.type){
      filter.typeId= req.params.type
    }
    if (req.query.title) {
      filter.title = { $regex: new RegExp("^" + req.query.title, "i") };
    }

    const events = await model.paginate(filter, options);

    if (!events.docs.length) {

      if (req.query.type) {
        return res.status(404).json({
          success: true,
          message: `No event found for ${req.query.type}`,
        });
      }
      if (req.query.title) {
        return res.status(404).json({
          success: true,
          message: `No event found for ${req.query.title}`,
        });
      }
      return res.status(404).json({
        success: true,
        message: "No event found",
      });
    }

    res.json({
      success: true,
      data: events,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function latestPlace (req, res, next)  {
    
  try {

    const page = 1;
    const  limit = 3 ; 

    const latestPlaces = await model.paginate(
      {confirmation:true},
      {
        sort: { _id: 'desc' },
        page: parseInt(page),
        limit: parseInt(limit),
      }
    );
    
    res.json({
      success: true,
      data: latestPlaces,
    });
  } catch (error) {
    next(error);
  }
}
function getStatus(event) {
  const now = new Date();
  if (event.start_date > now) {
    return "Coming soon";
  } else if (event.start_date <= now && event.end_date >= now) {
    return "Now";
  } else {
    return "Closed";
  }
}

async function getAll(req, res) {
  try {
    const filter = {confirmation: true};
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    if (req.params.type){
      filter.typeId= req.params.type
    }
    if (req.query.title) {
      filter.title = { $regex: new RegExp("^" + req.query.title, "i") };
    }
console.log(filter);
    const events = await model.paginate(filter, options);
    const eventsWithStatus = events.docs.map(event => {
      return {
        ...event.toObject(),
        status: event.status
      };
    });
    
    console.log(eventsWithStatus[0].status); // "Coming soon"

    if (!events.docs.length) {
      if (req.query.title) {
        return res.status(404).json({
          success: true,
          message: `No event found for ${req.query.title}`,
        });
      }
      return res.status(404).json({
        success: true,
        message: "No event found",
      });
    }
    res.json({
      success: true,
      data: {
        docs: events.docs,
        totalDocs: events.totalDocs,
        totalPages: events.totalPages,
        page: events.page,
        limit: events.limit,
        status: events.docs.length ? getStatus(events.docs[0]) : null
      }    });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const event = await model.findOne({ _id: id, confirmation: true });
    if (!event) {
      return res.status(404).send({ success: false, error: "Event not found" });
    }
    res.status(200).send({ success: true, event });
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
          .send({ success: false, message: "You haven'\t modified anything" });
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

export const updateConfirmationById = async (req, res) => {
  const eventId = req.params.id; 
  try {
    const event = await model.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }

    event.confirmation = !event.confirmation;

    const updatedevent = await event.save();

    return res.status(200).json({
      success: true,
      data: updatedevent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};
const event = { add, getAll, getById, edit, Delete, deleteAll, getPrivateEvent,updateConfirmationById ,latestPlace};
export default event;
