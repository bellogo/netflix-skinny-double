import { BaseRepository } from "./BaseRepository";
import MovieModel from "../models/movie";

class MovieRepository extends BaseRepository {
  constructor() {
    super();
    this.model = MovieModel;
  }
}

export default MovieRepository;
