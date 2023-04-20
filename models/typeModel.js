import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const TypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [100, "Name must not exceed 100 characters"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  }
});
const TypeModel = mongoose.model("Type", TypeSchema);

TypeSchema.plugin(mongoosePaginate);
export default TypeModel;
