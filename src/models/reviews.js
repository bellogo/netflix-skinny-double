import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  movieId: String,
  userId: String,
  rating: Number,
  review: String
});

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;
