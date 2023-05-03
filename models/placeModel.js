import mongoose from "mongoose";
import validator from "validator";
import mongoosePaginate from "mongoose-paginate-v2";

const PlaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [100, "Name must not exceed 100 characters"],
  },
  email: {
    type: String,
    required: true,
    minlength: [2, "Website must be at least 2 characters long"],
    maxlength: [500, "Website must not exceed 500 characters"],
    validate: {
      validator: validator.isEmail,
      message: "please enter a valid email address",
    },
  },
  description: {
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
        status: {
          type: String,
          required: true,
        },
        fromTo: {
          type: String,
        },
      },
      tuesday: {
        status: {
          type: String,
          required: true,
        },
        fromTo: {
          type: String,
        },
      },
      wednesday: {
        status: {
          type: String,
          required: true,
        },
        fromTo: {
          type: String,
        },
      },
      thursday: {
        status: {
          type: String,
          required: true,
        },
        fromTo: {
          type: String,
        },
      },
      friday: {
        status: {
          type: String,
          required: true,
        },
        fromTo: {
          type: String,
        },
      },
      saturday: {
        status: {
          type: String,
          required: true,
        },
        fromTo: {
          type: String,
        },
      },
      sunday: {
        status: {
          type: String,
          required: true,
        },
        fromTo: {
          type: String,
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
    // required: true,
  },
  placeType: {
    type: String,
    enum: ["restaurant","services","ngo","clubs"],
    required: true,
  },
  tagIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
  confirmation: {
    type: Boolean,
    default: false,
  },
});
PlaceSchema.plugin(mongoosePaginate);
const PlaceModel = mongoose.model("Place", PlaceSchema);
export default PlaceModel;

PlaceSchema.pre(["find", "findOneAndUpdate", "updateOne"], function () {
  this.populate({ path: "tagIds", select: "name description" }).populate(
    "typeId",
    "name description"
  );
});
