import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import config from "../config";
import router from "./routes/index";
import errorHandler from "./middleware/error_handler";
import passportSetup from "./utilities/passport";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.cookieKey],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/", router);

const port = config.port || 3000;
const host = "0.0.0.0";

// connect to DB and Start server
mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => console.log("DB connnected"))
  .on("error", () => console.log("DB conection error"));

app.get("/", (req, res) => {
  if (!req.user) {
    res.send("Welcome to netflix skinny double");
  } else {
    res.send(`${req.user.name} Welcome to netflix skinny double`);
  }
});

app.use((req, res, next) => {
  next({ statusCode: 404, message: "route not found." });
});
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
