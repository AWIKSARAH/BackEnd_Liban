import mongoose from "mongoose";
const fileSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const File = mongoose.model("File", fileSchema);

export default File;
