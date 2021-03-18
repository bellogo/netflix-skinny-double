import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index";
import errorHandler from "./middleware/error_handler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// connect to DB and Start server
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => console.log("DB connnected"))
  .on("error", () => console.log("Conection error", error));

app.use(bodyParser.json());
app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Welcome to netflix skinny double");
});
app.use((req, res, next) => {
  next({ statusCode: 404, message: "route not found." });
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
