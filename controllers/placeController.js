import PlaceModel from "../models/placeModel.js";
import { deleteImage } from "../middleware/imageHandlerMiddleware.js";
import { NotFoundError } from "../errors.js";
class PlaceController {
  //This function creates a new place document in the db
  async create(req, res, next) {
    try {
      const placeData = req.body;
      const place = await PlaceModel.create(placeData);

      return res.status(201).json({ success: true, savedPlace: place });
    } catch (error) {
      next(error);
    }
  }

  async read(req, res) {
    try {
      const filter = { confirmations: true };

      const { name, page = 1, limit = 10 } = req.query;

      if (req.params.type) {
        filter.typeId = req.params.type;
      }
      if (name) {
        filter.name = { $regex: new RegExp("^" + name, "i") };
      }

      const places = await PlaceModel.paginate(filter, { page, limit });

      if (!places.docs.length) {
        if (req.query.name) {
          throw new NotFoundError(`No place found for ${name}`);
        }

        throw new NotFoundError(`No places found`);
      }

      res.json({
        success: true,
        data: places,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPrivatePlace(req, res) {
    try {
      const filter = { confirmations: false };

      const { name, page = 1, limit = 10 } = req.query;

      if (req.params.type) {
        filter.typeId = req.params.type;
      }
      if (name) {
        filter.name = { $regex: new RegExp("^" + name, "i") };
      }

      const places = await PlaceModel.paginate(filter, { page, limit });

      if (!places.docs.length) {
        if (req.query.name) {
          throw new NotFoundError(`No place found for ${name}`);
        }

        throw new NotFoundError(`No places found`);
      }

      res.json({
        success: true,
        data: places,
      });
    } catch (error) {
      next(error);
    }
  }

  async readOne(req, res) {
    try {
      const place = await PlaceModel.findById(req.params.id);
      if (!place) {
        throw new NotFoundError(`No Blogs found`);
        
      }
      res.json({success: true, data: place});
    } catch (error) {
     next(error);
    }
  }

  async update(req, res, next) {
    try {
      const place = await PlaceModel.findById(req.params.id);
      if (!place) {
        throw new NotFoundError(`Place not found`);
      }
  
      if (req.body.image && place.image) {
        deleteImage(place.image);
      }
  
      const placeUpdate = {
        name: req.body.name,
        website: req.body.website,
        about: req.body.about,
        image: req.body.image,
        socialMedia: req.body.socialMedia?.length ? req.body.socialMedia : undefined,
        tagIds: req.body.tagIds?.length ? req.body.tagIds : undefined,
        location: req.body.location,
        typeId: req.body.typeId,
      };
  
      const daysOfWeek = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      const timeSlots = ["open", "close"];
      const schedule = req.body.schedule;
  
      if (
        daysOfWeek.some((day) =>
          timeSlots.some((slot) => schedule[day]?.[slot])
        )
      ) {
        placeUpdate.schedule = schedule;
      }
  
      const updatedPlace = await PlaceModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: placeUpdate },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({ success: true, updatedPlace });
    } catch (error) {
      next(error);
    }
  }
  

  async delete(req, res) {
    try {
      const place = await PlaceModel.findByIdAndDelete(req.params.id);
      if (!place) {
        throw new NotFoundError(`Place not found`);
      }
      if (place.image) {
        // Delete the previous image
        deleteImage(place.image);
        place.image = req.body.image;
      }
      res.json({ success: true, message: "Place Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  }

  async updateConfirmationById(req, res) {
    const placeId = req.params.id;
    try {
      const place = await PlaceModel.findById(placeId);
      if (!place) {
        throw new NotFoundError(`Place not found`);

      }

      place.confirmation = !place.confirmation;

      const updatedPlace = await place.save();

      return res.status(200).json({
        success: true,
        data: updatedPlace,
      });
    } catch (error) {
      next(error);
    }
  }
}

const placeController = new PlaceController();

export default placeController;
