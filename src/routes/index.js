import { Router } from "express";
import movieRoutes from "./movie_routes";

const router = new Router();

router.use("/", movieRoutes);

export default router;
