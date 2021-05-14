import express from "express";
import userController from "../controllers/user_controller";

const router = express.Router();
const {
  addUser, sendVerificationEmail, verifyUser, sendVerificationCode
} = userController;

router.post("/signup", addUser);
router.get("/sendverificationemail/:email", sendVerificationEmail);
router.get("/verify/:email", verifyUser);
router.get("/sendverificationcode/:number", sendVerificationCode);
router.post("/login");

export default router;
