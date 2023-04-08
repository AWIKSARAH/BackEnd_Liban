import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
  try {
    // const URL_DB = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD}@cluster0.jdjzk6x.mongodb.net/?retryWrites=true&w=majority`;
console.log(process.env.URL_DB);
    await mongoose.connect(process.env.URL_DB, {
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME
    });

    console.log("Database has been connected");
  } catch (error) {
    console.log(`Hello I'm Error ${error}`);
  }
};

export default connection;
