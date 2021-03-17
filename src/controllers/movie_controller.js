import validation from "../validations/movie_validation";
import Movie from "../models/movie";

export default class movieController {
  static async addMovie(req, res) {
    try {
      const { title } = req.body;
      const { error } = validation(req.body);
      if (error) return res.status(400).json({ status: "error", code: 400, message: error.message });
      const film = await Movie.findOne({ title });
      if (film) return res.status(400).json({ status: "error", code: 400, message: "movie already exists." });
      const newMovie = await Movie.create(req.body);
      return res.status(201).json({
        status: "success", code: 201, message: "movie has been added.", data: newMovie,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", code: 500, message: "Server error." });
    }
  }
}
