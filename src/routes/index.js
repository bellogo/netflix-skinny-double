import movieRoutes from "./movie_routes";
import userRoutes from "./user_routes";
import authRoutes from "./auth_routes";

const express = require("express");

const router = express.Router();

router.get("", (req, res) => res.send("Welcome to netflix skinny double"));

router.use("/api/v1/movie", movieRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/auth", authRoutes);

module.exports = router;
