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
      required: true,
    },
    start_date: { 
      type: Date, 
      required: true 
    },
    end_date: { 
      type: Date, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    id_social_media: { 
      type: Number, 
    },
    image: {
      type: String, 
      required: false,
    },
    id_tag: {
      type: String, 
      required: false,
      // type: Schema.Types.ObjectId,
      // ref: "Tag",
    },
  },
  {
    collection: "Event",
  }
);

// Use a middleware to automatically populate the "id_tag" field with the corresponding tag document.
// eventSchema.post(['find', 'findOne'], async function (events) {
//   if (events.length) {
//     await this.populate('id_tag');
//   }
// });

const Event = model("Event", eventSchema);
export default Event;
