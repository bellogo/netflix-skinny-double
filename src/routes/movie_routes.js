import express from "express";
import movieController from "../controllers/movie_controller";

const router = express.Router();
const {
  addMovie, deleteMovie, updateMovie, getAllMovies, getMovie
} = movieController;

router.post("/movie", addMovie);
router.get("/movie/:id", getMovie);
router.get("/movies", getAllMovies);
router.patch("/movie/:id", updateMovie);
router.delete("/movie/:id", deleteMovie);

export default router;
