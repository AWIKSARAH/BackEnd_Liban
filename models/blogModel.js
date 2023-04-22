import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const {Schema, model} = mongoose;
const Blogschema = new Schema({
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
Blogschema.pre(["find", "findOne"], function () {
    this.populate(["tag_id"]);
});

Blogschema.plugin(mongoosePaginate);

const blogschema = model("Blog", Blogschema);
export default blogschema;