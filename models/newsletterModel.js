import mongoose from "mongoose";
const {Schema, model} = mongoose;
const newsschema = new Schema({
    email:{
        type:String,
        required:true
    }
});
const newsletter = model("newsletter", newsschema);
export default newsschema;