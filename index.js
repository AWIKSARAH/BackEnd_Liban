import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import User_Routes from "./routes/userRouter.js"; // import User model
import { handle404Error, handleErrors } from "./HandlingError/HandleError.js";
import connection from "./config/connection_db.js";
import placeRouter from "./routes/placeRouter.js";
import typeRouter from "./routes/typeRouter.js";
import contactInfo from "./routes/contactInfoRouter.js";
import event_page from "./routes/eventRouter.js";
import tagRouter from "./routes/tagRouter.js";
import newsletter from './routes/newsletterRouter.js'
import blogRouter from './routes/blogRouter.js'


const app = express()
const port = process.env.PORT || 3000

connection()


connection();

if (process.env.DEV_NAME === "development") {
  app.use(morgan("dev"));

}
app.get('/', function (req, res) {
  res.send(':)))(((:')
})
app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//INCLUDE THE ROUTING
app.use('/api/user/',User_Routes);
app.use('/api/info/',contactInfo);
app.use("/api/places",  placeRouter);
app.use("/api/types",typeRouter)
app.use("/api/event", event_page);
app.use("/api/tag", tagRouter);
app.use("/api/news",newsletter);
app.use("/api/blog",blogRouter);


//Handling Errors 404 and other
// app.use(handle404Error);
// app.use(handleErrors);

app.listen(port, () => {
  console.log(`Hello :) Your Server Running on :  http://localhost:${port}`)
})


