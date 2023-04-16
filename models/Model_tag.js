import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tagschema = new Schema(
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

const Event = model("Tag", tagschema);
export default Event;
