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
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
