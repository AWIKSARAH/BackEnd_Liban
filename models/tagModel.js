import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tagSchema = new Schema(
  {
   
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    
    },

      },
  {
    collection: "Tag",
  }
);

const Event = model("Tag", tagSchema);
export default Event;





