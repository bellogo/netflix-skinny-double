import mongoose from "mongoose";

const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: String,
  genre: Array,
  rating: Number,
  description: String,
  imgLink: String,
  trailerLink: String,
  watchLink: String,
  downloadLq: String,
  downloadHq: String,
  watched: Boolean
});

const Movie = mongoose.model("movie", MovieSchema);

module.exports = Movie;
