import { validation, validateId, updateValidation } from "../validations/movie_validation";
import Movie from "../models/movie";

export default class movieController {
  static async addMovie(req, res, next) {
    const { title } = req.body;
    const { error } = validation(req.body);
    if (error) return next({ statusCode: 400, message: error.message });
    const film = await Movie.findOne({ title });
    if (film) return next({ statusCode: 400, message: "movie already exists." });
    const newMovie = await Movie.create(req.body);
    return res.status(201).json({
      status: "success", code: 201, message: "movie has been added.", data: newMovie,
    });
  }

  static async deleteMovie(req, res, next) {
    const { id } = req.params;
    const { error } = validateId({ id });
    if (error) return next({ statusCode: 400, message: error.message });
    const film = await Movie.findOne({ _id: id });
    if (!film) return next({ statusCode: 404, message: "movie not found." });
    const deletedMovie = await Movie.findOneAndDelete({ _id: id });
    return res.status(200).json({
      status: "success", code: 200, message: "movie has been deleted.", data: deletedMovie,
    });
  }

  static async updateMovie(req, res, next) {
    const { id } = req.params;
    const { error } = validateId({ id });
    if (error) return next({ statusCode: 400, message: error.message });
    const joi = updateValidation(req.body);
    if (joi.error) return next({ statusCode: 400, message: joi.error.message });
    const film = await Movie.findOne({ _id: id });
    if (!film) return next({ statusCode: 404, message: "movie not found." });
    if (req.body.title) {
      const movie = await Movie.findOne({ title: req.body.title });
      if (movie) return next({ statusCode: 400, message: "movie title already exists." });
    }
    const updatedMovie = await Movie.findOneAndUpdate({ _id: id }, req.body, { new: true });
    return res.status(200).json({
      status: "success", code: 200, message: "movie has been updated.", data: updatedMovie,
    });
  }

  static async getAllMovies(req, res, next) {
    const movies = await Movie.find({});
    return res.status(200).json({
      status: "success", code: 200, message: "successfully retrieved all movies.", data: movies,
    });
  }

  static async getMovie(req, res, next) {
    const { id } = req.params;
    const { error } = validateId({ id });
    if (error) return next({ statusCode: 400, message: error.message });
    const film = await Movie.findOne({ _id: id });
    if (!film) return next({ statusCode: 404, message: "movie not found." });
    return res.status(200).json({
      status: "success", code: 200, message: "successfully retrieved movie.", data: film,
    });
  }
}
