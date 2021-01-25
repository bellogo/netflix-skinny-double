import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// connect to DB and Start server
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(port, () => {
    console.log(`DB connnected, Server Running on: ${port}`);
  }))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome to netflix skinny double");
});

export default app;
