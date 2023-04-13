import PlaceModel from "../models/placeModel.js";
import { deleteImage } from "../middleware/HandlingImage.js";

class PlaceController {
  //This function creates a new place document in the db
  async create(req, res) {
    try {
      const place = new PlaceModel({
        name: req.body.name,
        website: req.body.website,
        about: req.body.about,
        socialMedia: JSON.parse(req.body.socialMedia),
        // tagIds: req.body.tagIds,   // Uncomment this line and provide the appropriate field name if you want to include tagIds.
        schedule: JSON.parse(req.body.schedule),
        location: req.body.location,
        image: req.body.image,
        // typeId: req.body.typeId     // Uncomment this line and provide the appropriate field name if you want to include typeId.
      });
      console.log(req.body.tagIds);
      await place.validate();

      const savedPlace = await place.save();
      
      return res.status(201).json({ success: true, savedPlace });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        errors.status = 422;
        return res.status(422).json({ success: false, errors });
      }
      return res.status(500).json({ success: false, message: "Server Error",error: error.message  });
    }
  }
  async read(req, res) {
    try {
      const pageNumber = req.query.page || 1;
      const skipCount = (pageNumber - 1) * PAGE_SIZE;
  
      const totalPlaces = await PlaceModel.countDocuments();
      const totalPages = Math.ceil(totalPlaces / PAGE_SIZE);
  
      const places = await PlaceModel.find().skip(skipCount).limit(PAGE_SIZE);
  
      return res.status(200).json({
        success: true,
        places: places,
        pageNumber: pageNumber,
        totalPages: totalPages
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  async readOne(req, res) {
    try {
      const place = await PlaceModel.findById(req.params.id);
      if (!place) {
        return res
          .status(404)
          .json({ success: false, message: "Place not found" });
      }
      res.json(place);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const place = await PlaceModel.findById(req.params.id);
      if (!place) {
        return res
          .status(404)
          .json({ success: false, message: "Place not found" });
      }

      place.name = req.body.name;
      place.website = req.body.website;
      place.about = req.body.about;
      place.socialMedia = req.body.socialMedia;
      place.tag_id = req.body.tag_id;
      place.schedule = req.body.schedule;
      place.location = req.body.location;
      place.type_id = req.body.type_id;

      // Check if a new image has been uploaded
      if (req.body.image) {
        // Delete the previous image
        deleteImage(place.image);
        place.image = req.body.image;
      }

      await place.validate();

      const savedPlace = await place.save();
      return res.status(200).json({ success: true, savedPlace });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        return res.status(422).json({ success: false, errors });
      }
      console.error(error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const place = await PlaceModel.findByIdAndDelete(req.params.id);
      if (!place) {
        return res
          .status(404)
          .json({ success: false, message: "Place not found" });
      }
      if (place.image) {
        // Delete the previous image
        deleteImage(place.image);
        place.image = req.body.image;
      }
      res.json({ success: true, message: "Place deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  async readByTypeId(req, res) {
    try {
      const { typeId } = req.params;
      const places = await PlaceModel.find({ typeId });
      res.json({ success: true, places });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}

export default PlaceController;
