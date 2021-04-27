import { Router } from "express";
import movieRoutes from "./movie_routes";
import userRoutes from "./user_routes";
import authRoutes from "./auth_routes";

const router = new Router();

router.use("/", movieRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;
