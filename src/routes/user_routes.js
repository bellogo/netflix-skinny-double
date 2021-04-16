import express from "express";
import userController from "../controllers/user_controller";

const router = express.Router();
const { addUser } = userController;

router.post("/users/signup", addUser);

export default router;
