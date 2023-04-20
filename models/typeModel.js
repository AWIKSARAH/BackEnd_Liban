import mongoose from "mongoose";

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
export default TypeModel;
