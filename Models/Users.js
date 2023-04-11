import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const User_Schema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please enter a Name, this is required"],
    maxLength: [25, "U can't exceed more than 25 characters"],
    trim: true,
  },
  email: {
    type: "string",
    required: [true, "Please enter a Email, this is required"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid Email",
    },
    unique: true,
  },
  IsAdmin: {
    type: "boolean",
    default: false,
  },
  password: {
    type: "string",
    minLenght: 8,
    required: [true, "Please enter a Password, this is required"],
    trim: true,
    select: false,
  },
});


User_Schema.pre('save',async function (next) {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt)
  next();
})

User_Schema.methods.createJWT = function(){
  return jwt.sign({userId:this._id}, process.env.SECRET_KEY,{expiresIn:process.env.JWT_LIFETIME})
}

User_Schema.methods.comparePassword = async function(candidate){
  const isMatch = await bcryptjs.compare(candidate,this.password);
  return isMatch ;
}

User_Schema.methods.grant = async function(candidate){
  
}
export default mongoose.model("Users", User_Schema);
