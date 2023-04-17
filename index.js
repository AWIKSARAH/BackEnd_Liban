import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import User_Routes from "./routes/userRouter.js"; // import User model
import { handle404Error, handleErrors } from "./HandlingError/HandleError.js";
import connection from "./config/connection_db.js";
import placeRouter from "./routes/placeRouter.js";
import typeRouter from "./routes/typeRouter.js";
import contactInfoModel from "./routes/contactInfoRouter.js";
import event_page from "./routes/Route_event.js";
import tag_page from "./routes/Route_tag.js";

const app = express();
const port = process.env.PORT || 3000;



connection();

if (process.env.DEV_NAME === "developpment") {
  app.use(morgan("dev"));
}
app.get("/", function (req, res) {
  res.send(":)))(((:");
});
app.use(express.json());
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//INCLUDE THE ROUTING
app.use('/api/user/',User_Routes);
app.use('/api/info/',contactInfoModel);
app.use("/api/places",  placeRouter);
app.use("/api/types",typeRouter)
app.use("/api/event", event_page);
app.use("/api/tag", tag_page);

//Handling Errors 404 and other
// app.use(handle404Error);
// app.use(handleErrors);

app.listen(port, () => {
  console.log(`Hello :) Your Server Running on :  http://localhost:${port}`);
});
