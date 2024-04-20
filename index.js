import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import User_Routes from "./routes/userRouter.js"; // import User model
import { handleErrors } from "./HandlingError/HandleError.js";
import connection from "./config/connection_db.js";
import placeRouter from "./routes/placeRouter.js";
import typeRouter from "./routes/typeRouter.js";
import contactInfo from "./routes/contactInfoRouter.js";
import event_page from "./routes/eventRouter.js";
import tagRouter from "./routes/tagRouter.js";
import newsletter from "./routes/newsletterRouter.js";
import blogRouter from "./routes/blogRouter.js";
import fileRouter from "./routes/fileRouter.js";
import {visitorTracker} from "./controllers/visitor.js";
const app = express();
const port = process.env.PORT || 3000;

connection();

app.use(morgan("dev"));

app.use("/visitor", visitorTracker);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//INCLUDE THE ROUTING
app.use("/api/user/", User_Routes);
app.use("/api/info/", contactInfo);
app.use("/api/places", placeRouter);
app.use("/api/types", typeRouter);
app.use("/api/events", event_page);
app.use("/api/tag", tagRouter);
app.use("/api/news", newsletter);
app.use("/api/blog", blogRouter);
app.use("/api/files", fileRouter);

app.use("/uploads",express.static("uploads"));

//Handling Errors 404 and other
// app.use(handle404Error);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`Hello :) Your Server Running on :  http://localhost:${port}`);
});
