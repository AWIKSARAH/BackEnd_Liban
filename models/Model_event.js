import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventschema = new Schema(
  {
   
    Title: {
      type: String,
    //   required: true,
    },
    description: {
      type: String,
    //   required: true,
    
    },

    from_date: { 
        type: Date, 
        // required: true 
    },


    end_date: { 
        type: Date, 
        // required: true 
    },


    location: { 
        type: String, 
        // required: true 
    },

    id_social_media : { 
        type : Number, 
    },

    image : {
        type: String, 
        required: false,
    },

    tag:{
        type: Number,
        required:false,
    },

      },
  {
    collection: "Event",
  }
);

const Event = model("Event", eventschema);
export default Event;
