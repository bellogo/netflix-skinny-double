import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  number: Number,
  password: String,
  role: String,
  verified: Boolean
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
