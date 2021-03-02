import mongoose from "mongoose";

const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  description: {
    type: String,
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String
  },
  watchLink: {
    type: String
  },
  downloadLq: {
    type: String
  },
  downloadHq: {
    type: String
  },
  watched: {
    type: String,
    default: false
  }
});

const Movie = mongoose.model("movie", MovieSchema);

module.exports = Movie;
