import { number } from "joi";
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user"
  },
  referenceId: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationCode: { type: Number }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
