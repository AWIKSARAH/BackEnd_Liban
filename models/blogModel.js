import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema, model } = mongoose;
const BlogSchema = new Schema(
  {
    tags: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    collection: "Blog",
  }
);
BlogSchema.plugin(mongoosePaginate);

const blogModel = model("Blog", BlogSchema);
export default blogModel;
