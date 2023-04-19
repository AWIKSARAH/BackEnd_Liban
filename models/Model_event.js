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
      // required: true,
    },
    id_social_media: {
      type: Number,
    },
    image: {
      type: String,
      // required: false,
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
      required: false,
    },
    
  },
  {
    collection: "Event",
  }
);

eventSchema.pre('find', function() {
  console.log(this.tagIds);
  this.populate('tagIds','typeId');
});

const Event = model("Event", eventSchema);
export default Event;
