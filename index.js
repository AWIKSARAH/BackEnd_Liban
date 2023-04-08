import express from "express";
import morgan from "morgan";
import { handle404Error, handleErrors } from "./HandlingError/HandleError.js";

const app = express();
const port = process.env.PORT || 3000;

if ((process.env.DEV_NAME = "developpment")) {
  app.use(morgan("dev"));
}
app.get("/", function (req, res) {
  res.send(":)))(((:");
});

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handling Errors 404 and other
app.use(handle404Error);
app.use(handleErrors);

app.listen(port, () => {
  console.log(`Hello :) Your Server Running on PORT: ${port}`);
});
