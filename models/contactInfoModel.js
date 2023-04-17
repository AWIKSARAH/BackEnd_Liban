import mongoose from "mongoose";

const contactInfo = new mongoose.Schema({

    // socialMedia: {
      //   type: [
      //     {
      //       name: {
      //         type: String,
      //         required: true,
      //         minlength: [
      //           2,
      //           "Social media name must be at least 2 characters long",
      //         ],
      //         maxlength: [100, "Social media name must not exceed 100 characters"],
      //       },
      //       url: {
      //         type: String,
      //         required: true,
      //         minlength: [2, "Social media url must be at least 2 characters long"],
      //         maxlength: [500, "Social media url must not exceed 500 characters"],
      //       },
      //     },
      //   ],
      //   validate: {
      //     validator: function (v) {
      //       return v && v.length > 0;
      //     },
      //     message: "At least one social media account is required",
      //   },
      // },
    logo:{
        type:String,
        required: true
    },
    aboutUs: {
        type: String,
        // required: true
    },
})

export default mongoose.model('contactInfo', contactInfo, 'contactInfo');
