import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import router from "./routes/index";
import errorHandler from "./middleware/error_handler";
import { googleStrategySignUp } from "./utilities/passport_google_signup";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/", router);

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: process.env.COOKIE_KEY,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use("googleSignUp", googleStrategySignUp);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const port = process.env.PORT || 3000;

// connect to DB and Start server
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => console.log("DB connnected"))
  .on("error", () => console.log("DB conection error"));

app.get("/", (req, res) => {
  res.send("Welcome to netflix skinny double");
});

app.get(
  "/auth/google/signup",
  passport.authenticate("googleSignUp", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    if (!req.user.message) {
      res.redirect("/");
    } else {
      res.status(409).json(req.user);
    }
  }
);

app.use((req, res, next) => {
  next({ statusCode: 404, message: "route not found." });
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
