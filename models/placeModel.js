import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [100, "Name must not exceed 100 characters"],
  },
  website: {
    type: String,
    required: true,
    minlength: [2, "Website must be at least 2 characters long"],
    maxlength: [500, "Website must not exceed 500 characters"],
  },
  about: {
    type: String,
    required: true,
    minlength: [10, "About must be at least 10 characters long"],
  },
  socialMedia: {
    type: [
      {
        name: {
          type: String,
          required: true,
          minlength: [
            2,
            "Social media name must be at least 2 characters long",
          ],
          maxlength: [100, "Social media name must not exceed 100 characters"],
        },
        url: {
          type: String,
          required: true,
          minlength: [2, "Social media url must be at least 2 characters long"],
          maxlength: [500, "Social media url must not exceed 500 characters"],
        },
      },
    ],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "At least one social media account is required",
    },
  },
  tagIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
  schedule: {
    type: {
      monday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      tuesday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      wednesday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      thursday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      friday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      saturday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
      sunday: {
        open: {
          type: String,
          required: true,
        },
        close: {
          type: String,
          required: true,
        },
      },
    },
    required: true,
  },
  location: {
    type: String,
    required: true,
    minlength: [2, "Location must be at least 2 characters long"],
    maxlength: [100, "Location must not exceed 100 characters"],
  },
  image: {
    type: String,
    required: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
  tagIds:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  }],
});
const PlaceModel = mongoose.model("Place", PlaceSchema);
export default PlaceModel;


PlaceSchema.pre('find', function() {
  console.log(this.tagIds);
  this.populate('tagIds','typeId');
});