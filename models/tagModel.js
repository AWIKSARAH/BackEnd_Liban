import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
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

tagSchema.plugin(mongoosePaginate);

const Event = model("Tag", tagSchema);
export default Event;





