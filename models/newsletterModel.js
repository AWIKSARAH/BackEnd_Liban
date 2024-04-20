import mongoose from "mongoose";
import validator from "validator";
import mongoosePaginate from 'mongoose-paginate-v2';

const {Schema, model} = mongoose;

const newsschema = new Schema({
    email: {
        type: "string",
        required: [true, "Please enter a Email, this is required"],
        validate: {
          validator: validator.isEmail,
          message: "Please provide a valid Email",
        },
        unique: [true,'You are subscribed before Thank you!'],
      },
});
newsschema.plugin(mongoosePaginate);

const Newsletter = model("newsletter", newsschema);

export default Newsletter;
