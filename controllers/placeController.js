import PlaceModel from "../models/placeModel.js";
import { deleteImage } from "../middleware/imageHandlerMiddleware.js";
import { NotFoundError } from "../errors.js";
class PlaceController {
  //This function creates a new place document in the db
  async create(req, res, next) {
    try {
      const placeData = req.body;
      placeData.confirmation=false
      const place = await PlaceModel.create(placeData);

      return res.status(201).json({ success: true, savedPlace: place });
    } catch (error) {
      next(error);
    }
  }

  async read(req, res, next) {
      const { title, page = 1, place_type } = req.query;
      const query = {};
    
      if (title) {
        query.title = new RegExp(title, "i"); // case-insensitive search
      }
    
      if (place_type) {
        query.placeType = place_type;
      }
      query.confirmation=true
    
      const options = {
        page: parseInt(page),
        limit: 10, // show 10 results per page
      };
    
      try {
        const places = await PlaceModel.paginate(query, options);
        if (!places.docs.length) {

          if (place_type) {
           throw new NotFoundError("Place not found for type " + place_type)
          }
          if (title) {
           throw new NotFoundError(`No Place found for ${title}`)
          }
          throw new NotFoundError('Places not found')
        } 
                res.json(places);
      } catch (error) {
        next(error)
      }
    };
    
  async readAll(req, res, next) {
    const { title, page = 1, place_type } = req.query;
    const query = {};
  
    if (title) {
      query.title = new RegExp(title, "i"); // case-insensitive search
    }
  
    if (place_type) {
      query.placeType = place_type;
    }
  
    const options = {
      page: parseInt(page),
      limit: 10, // show 10 results per page
    };
  
    try {
      const places = await PlaceModel.paginate(query, options);
      if (!places.docs.length) {

        if (place_type) {
         throw new NotFoundError("Place not found for type " + place_type)
        }
        if (title) {
         throw new NotFoundError(`No Place found for ${title}`)
        }
        throw new NotFoundError('Places not found')
      } 
              res.json(places);
    } catch (error) {
      next(error)
    }
  };



  async latestPlace (req, res, next)  {
    
    try {

      const page = 1;
      const  limit = 12 ; 
  
      const latestPlaces = await PlaceModel.paginate(
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
  

  async getPrivatePlace(req, res,next) {
    const { title, page = 1, placeType } = req.query;
    const query = {};
  
    if (title) {
      query.title = new RegExp(title, "i"); // case-insensitive search
    }
  
    if (placeType) {
      query.placeType = placeType;
    }
    query.confirmation=false
  
    const options = {
      page: parseInt(page),
      limit: 10, // show 10 results per page
      select: "title email description location image placeType",
    };
  
    try {
      const places = await PlaceModel.paginate(query, options);
      res.json(places);
    } catch (error) {
      next(error)
    }
  };


  async readOne(req, res, next) {
    try {
      const place = await PlaceModel.findById(req.params.id);
      if (!place) {
        throw new NotFoundError(`No place found`);
        
      }
      res.json({success: true, data: place});
    } catch (error) {
     next(error);
    }
  }

  async update(req, res, next) {
    console.log(req.body)
    try {
      const place = await PlaceModel.findById(req.params.id);
      if (!place) {
        throw new NotFoundError(`Place not found`);
      }
  
      if (req.body.image && place.image) {
        deleteImage(place.image);
      }
  
      const placeUpdate = req.body;
  
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
  

  async delete(req, res, next) {
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

  async updateConfirmationById(req, res, next) {
    const placeId = req.params.id;
    try {
      const place = await PlaceModel.findById(placeId);
      if (!place) {
        throw new NotFoundError(`Place not found`);

      }

      place.confirmation = req.body.confirmation;

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
