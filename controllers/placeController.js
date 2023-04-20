import PlaceModel from "../models/placeModel.js";
import { deleteImage } from "../middleware/imageHandlerMiddleware.js";
const PAGE_SIZE = 10
class PlaceController {
  //This function creates a new place document in the db
  async create(req, res) {
    try {
      const place = new PlaceModel({
        name: req.body.name,
        website: req.body.website,
        about: req.body.about,
        socialMedia: req.body.socialMedia,
        tagIds: req.body.tagIds,   
        schedule: req.body.schedule,
        location: req.body.location,
        image: req.body.image,
        typeId: req.body.typeId
      });
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
      return res.status(500).json({ success: false, message: "Server Error" ,error:error.message });
    }
  }
  async read(req, res) {
    try {
      const filter = {}
      // const options = {
      //   page: parseInt(req.query.page)|| 1,
      //   limit: parseInt(req.query.limit)|| 10
      //   }
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      if (req.query.title) {
        filter.title = { $regex: new RegExp('^' + req.query.title, 'i') }
      }
     
  
      const places = await PlaceModel.paginate(filter, {page,limit})
     
  
      if (!places.docs.length) {
        return res.status(404).json({
          success: true,
          message: 'No place found',
        })
      }
  
      res.json({
        success: true,
        data: places,
       
      })
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server Error",error: error.message  });
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
      return res.status(500).json({ success: false, message: "Server Error" ,error:error.message });
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
  
      if (req.body.image && place.image) {
        // Delete the previous image
        deleteImage(place.image);
      }
      const placeUpdate = {}
      if (req.body.name) {
        placeUpdate.name = req.body.name;
      }
      if (req.body.website) {
        placeUpdate.website = req.body.website;
      }
      if (req.body.about) {
        placeUpdate.about = req.body.about;
      }
      if (req.body.image) {
        placeUpdate.image = req.body.image;
      }
      if (req.body.socialMedia[0].name||req.body.socialMedia[0].url) {
        placeUpdate.socialMedia = req.body.socialMedia;
      }
      if (req.body.tagIds[0]) {
        placeUpdate.tagIds = req.body.tagIds;
      }
      const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const timeSlots = ["open", "close"];
      const schedule = req.body.schedule;
      
      if (daysOfWeek.some(day => timeSlots.some(slot => schedule[day] && schedule[day][slot]))) {
        placeUpdate.schedule = schedule;
      }
      
      if (req.body.location) {
        placeUpdate.location = req.body.location;
      }
      if (req.body.image) {
        placeUpdate.image = req.body.image;
      }
      if (req.body.typeId) {
        placeUpdate.typeId = req.body.typeId;
      }
      const updatedPlace = await PlaceModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: placeUpdate },
        { new: true, runValidators: true }
      );
      

  
      return res.status(200).json({ success: true, updatedPlace });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = {};
        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        return res.status(422).json({ success: false, errors });
      }
      console.error(error);
      return res.status(500).json({ success: false, message: "Server Error",error: error.message });
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
      res.json({ success: true, message: "Place Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" ,error:error.message });
    }
  }

}
const placeController = new PlaceController();

export default placeController;
