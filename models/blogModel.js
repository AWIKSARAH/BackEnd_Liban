import mongoose from "mongoose";
const {Schema, model} = mongoose;
const Blogschema = new Schema({
   
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
    },
     tag_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
    },
},
    {
        collection: "Blog"
    }
)
    ;
Blogschema.pre(["find", "findOne", "save", "create"], function () {
    this.populate(["tag_id"]);
});

const blogschema = model("Blog", Blogschema);
export default blogschema;