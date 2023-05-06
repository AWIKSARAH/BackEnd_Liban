import { BadRequestError, NotFoundError } from "../errors.js";
import model from "../models/eventModel.js";
import moment from "moment"

 function add(req, res, next) {
  req.body.confirmation=false;
   model.create(req.body)
    .then((response) => res.status(200).send({ success: true, response }))
    .catch((error) => {
      next(error);
    });
}
async function readAll(req, res, next) {
  try {
    const filter={}
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    const query = req.query.q;

    if (query) {
      const regex = new RegExp(query, "i");
      filter["$or"] = [        { category: { $regex: regex } },        { title: { $regex: regex } },        { tags: { $regex: regex } },      ];
    }

    const type = req.params.type;
    if (type) {
      filter.typeId = type;
    }

    // Add filter for date range
    const range = req.query.range;
    let startDate, endDate;
    if (range === "thisWeek") {
      startDate = moment().startOf("week").toDate();
      endDate = moment().endOf("week").toDate();
    } else if (range === "thisMonth") {
      startDate = moment().startOf("month").toDate();
      endDate = moment().endOf("month").toDate();
    } else if (range === "custom" && req.query.startDate && req.query.endDate) {
      startDate = moment(req.query.startDate).startOf("day").toDate();
      endDate = moment(req.query.endDate).endOf("day").toDate();
    }
    if (startDate && endDate) {
      filter.start_date = { $gte: startDate, $lte: endDate };
    }

    const events = await model.paginate(filter, options);

    if (!events.docs.length) {
      if (type) {
        throw new NotFoundError("Event not found for type " + type);
      }
      throw new NotFoundError(`No event found for ${query}`);
    }

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
}
//
async function getPrivateEvent(req, res, next) {
 
  try {
    const filter = {confirmation:false};
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    const query = req.query.q;

    if (query) {
      const regex = new RegExp(query, "i");
      filter["$or"] = [        { category: { $regex: regex } },        { title: { $regex: regex } },        { tags: { $regex: regex } },      ];
    }

    const type = req.params.type;
    if (type) {
      filter.typeId = type;
    }

    // Add filter for date range
    const range = req.query.range;
    let startDate, endDate;
    if (range === "thisWeek") {
      startDate = moment().startOf("week").toDate();
      endDate = moment().endOf("week").toDate();
    } else if (range === "thisMonth") {
      startDate = moment().startOf("month").toDate();
      endDate = moment().endOf("month").toDate();
    } else if (range === "custom" && req.query.startDate && req.query.endDate) {
      startDate = moment(req.query.startDate).startOf("day").toDate();
      endDate = moment(req.query.endDate).endOf("day").toDate();
    }
    if (startDate && endDate) {
      filter.start_date = { $gte: startDate, $lte: endDate };
    }

    const events = await model.paginate(filter, options);

    if (!events.docs.length) {
      if (type) {
        throw new NotFoundError("Event not found for type " + type);
      }
      throw new NotFoundError(`No event found for ${query}`);
    }

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
}

async function latestPlace(req, res, next) {
  try {
    const page = 1;
    const limit = 3;

    const latestPlaces = await model.paginate(
      { confirmation: true },
      {
        sort: { _id: "desc" },
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

async function getAll(req, res, next) {
  try {
    const filter = {confirmation:true};
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    const query = req.query.q;

    if (query) {
      const regex = new RegExp(query, "i");
      filter["$or"] = [        { category: { $regex: regex } },        { title: { $regex: regex } },        { tags: { $regex: regex } },      ];
    }

    const type = req.params.type;
    if (type) {
      filter.typeId = type;
    }

    // Add filter for date range
    const range = req.query.range;
    let startDate, endDate;
    if (range === "thisWeek") {
      startDate = moment().startOf("week").toDate();
      endDate = moment().endOf("week").toDate();
    } else if (range === "thisMonth") {
      startDate = moment().startOf("month").toDate();
      endDate = moment().endOf("month").toDate();
    } else if (range === "custom" && req.query.startDate && req.query.endDate) {
      startDate = moment(req.query.startDate).startOf("day").toDate();
      endDate = moment(req.query.endDate).endOf("day").toDate();
    }
    if (startDate && endDate) {
      filter.start_date = { $gte: startDate, $lte: endDate };
    }

    const events = await model.paginate(filter, options);

    if (!events.docs.length) {
      if (type) {
        throw new NotFoundError("Event not found for type " + type);
      }
      throw new NotFoundError(`No event found for ${query}`);
    }

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
}


async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const event = await model.findById(id);
    if (!event) {
      return res.status(404).send({ success: false, error: "Event not found" });
    }
    res.status(200).send({ success: true, data:event });
  } catch (error) {
    next(error);
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
    .catch((error) => {
      next(error);
    });
}

function Delete(req, res, next) {
  const id = req.params.id;
  model
    .findByIdAndRemove(id)
    .then((response) => {
      if (!response) {
        throw new NotFoundError("Event not found");
      }
      res.status(200).send({
        success: true,
        message: "Document deleted successfully.",
        response,
      });
    })
    .catch((error) => {
      next(error);
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
  } catch (error) {
    return next(error);
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

    const updatedEvent = await event.save();

    return res.status(200).json({
      success: true,
      data: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

async function getEventAfter(req, res, next) {
  const { startDate, endDate } = req.query;

  try {
    const events = await Event.find({
      start_date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

const event = {
  add,
  getAll,
  getById,
  edit,
  Delete,
  deleteAll,
  getPrivateEvent,
  updateConfirmationById,
  latestPlace,
  getEventAfter,
  readAll,
};

export default event;
