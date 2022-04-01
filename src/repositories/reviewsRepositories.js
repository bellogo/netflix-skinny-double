import { BaseRepository } from "./BaseRepository";
import ReviewModel from "../models/reviews";

class ReviewRepository extends BaseRepository {
  constructor() {
    super();
    this.model = ReviewModel;
  }
}

export default ReviewRepository;
