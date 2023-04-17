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
      // required: true,
    },
    end_date: {
      type: Date,
      // required: true,
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
    
  },
  {
    collection: "Event",
  }
);

eventSchema.pre('find', function() {
  console.log(this.tagIds);
  this.populate('tagIds');
});

const Event = model("Event", eventSchema);
export default Event;
