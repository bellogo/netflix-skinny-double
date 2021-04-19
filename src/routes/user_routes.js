import express from "express";
import passport from "passport";

import userController from "../controllers/user_controller";

const router = express.Router();
const { addUser } = userController;

router.post("/users/signup", addUser);

router.get("/auth/google/signup", passport.authenticate("googleSignUp", {
  scope: ["profile", "email"]
}));

export default router;
