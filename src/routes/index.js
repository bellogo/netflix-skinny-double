import { Router } from "express";
import movieRoutes from "./movie_routes";
import userRoutes from "./user_routes";

const router = new Router();

router.use("/", movieRoutes);
router.use("/", userRoutes);

export default router;
