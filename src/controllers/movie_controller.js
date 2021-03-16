import validation from "../validations/movie_validation";

export default class movieController {
  static async addMovie(req, res) {
    try {
      const { error } = validation(req.body);
      if (error) return res.status(400).json({ status: 400, error: error.message });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }
}
