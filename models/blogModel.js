import mongoose from "mongoose";
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

const blogschema = model("Blog", Blogschema);
export default blogschema;