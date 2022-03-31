const mongoose = require("mongoose");

const host = "0.0.0.0";

const { port, dbURL } = require("./config");
const app = require("./app");

// connect to DB and Start server
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => {
  app.listen(port, host, () => {
    console.log(`running on port ${port}`);
  });
  console.log("mongoDB connnected");
}).on("error", () => console.log("DB conection error"));
