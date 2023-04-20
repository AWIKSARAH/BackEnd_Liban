import mongoose from "mongoose";
const { Schema, model } = mongoose;
const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    start_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value < this.end_date && value > new Date();
        },
        message: props => `Invalid start date`
      }
    },
    end_date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.start_date && value > new Date();
        },
        message: props => `Invalid end date`
      }
    },
    location: {
      type: String,
      required: true,
    },
    // socialMedia: {
    //   type: [
    //     {
    //       name: {
    //         type: String,
    //         required: true,
    //         minlength: [
    //           2,
    //           "Social media name must be at least 2 characters long",
    //         ],
    //         maxlength: [100, "Social media name must not exceed 100 characters"],
    //       },
    //       url: {
    //         type: String,
    //         required: true,
    //         minlength: [2, "Social media url must be at least 2 characters long"],
    //         maxlength: [500, "Social media url must not exceed 500 characters"],
    //       },
    //     },
    //   ],
    //   validate: {
    //     validator: function (v) {
    //       return v && v.length > 0;
    //     },
    //     message: "At least one social media account is required",
    //   },
    // },
    image: {
      type: String,
      // required: true,
    },
    tagIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tag',
        required: false,
        
      },
    ],
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
      required: true,
    },
    confirmation:{
      type: Boolean,
      default: false,
    }
    
  },
  
  {
    collection: "Event",
  }
);

eventSchema.pre(['find','findOneAndUpdate','updateOne'], function() {
  console.log(this.tagIds);
  this.populate({ path: 'tagIds', select: 'name description' })
      .populate('typeId', 'name description');
});



const Event = model("Event", eventSchema);
export default Event;
