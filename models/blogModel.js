import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const {Schema, model} = mongoose;
const BlogSchema = new Schema({
    tag_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    },
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,

    }
},
    {
        collection: "Blog"
    }
)
    ;
BlogSchema.pre(["find", "findOne"], function () {
    this.populate(["tag_id"]);
});

BlogSchema.plugin(mongoosePaginate);

const blogModel = model("Blog", BlogSchema);
export default blogModel;