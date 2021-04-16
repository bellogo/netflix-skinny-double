import { boolean } from "joi";
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String
  },
  number: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user"
  },
  verified: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
