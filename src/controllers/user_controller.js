import dotenv from "dotenv";
import hash from "../utilities/bcrypt";
import generateToken from "../utilities/jwt";
import { userValidation } from "../utilities/joi_validations";
import Users from "../models/user";
import sendgrid from "../utilities/sendgrid";
import sling from "../utilities/slingsms";

dotenv.config();
sling.setApiKey(process.env.SLING_API_TOKEN);

export default class userController {
  static async addUser(req, res, next) {
    const { error } = userValidation(req.body);
    if (error) return next({ statusCode: 400, message: error.message });
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
      const user = await Users.findOne({ email: req.body.email });
      if (user) return next({ statusCode: 400, message: "email already exists." });
    }
    if (req.body.number) {
      const user = await Users.findOne({ number: req.body.number });
      if (user) return next({ statusCode: 400, message: "number already exists." });
    }
    const hashedPassword = await hash(req.body.password);
    req.body.password = hashedPassword;
    const newUser = await Users.create(req.body);
    const token = await generateToken({ newUser });
    const { email, name } = newUser;
    await sendgrid.sendVerificationEmail(email, name);
    return res.status(201).json({
      status: "success", code: 201, message: "user has been added.", token
    });
  }

  static async sendVerificationEmail(req, res, next) {
    const { email } = req.params;
    const user = await Users.findOne({ email });
    if (!user) return next({ statusCode: 404, message: "user not found." });
    await sendgrid.sendVerificationEmail(email, user.name);
  }

  static async verifyUser(req, res, next) {
    const { email } = req.params;
    await Users.findOneAndUpdate({ email }, { verified: true }, { new: true });
    return res.status(200).json({
      status: "success", code: 200, message: "user has been verified.", data: null
    });
  }

  static async sendVerificationCode(req, res, next) {
    const { number } = req.params;
    let code = Math.floor(1000 + Math.random() * 9000);
    await Users.findOneAndUpdate({ number }, { verificationCode: code }, { new: true });
    let sms = await sling.sendMessage(number, `verify your number with the folowing code: ${code}`);
    if (sms.status === "success") {
      return res.status(200).json({
        status: "success", code: 200, message: `verification code has been sent to ${number}`, data: sms
      });
    }
    return next({ statusCode: 400, message: sms.details, data: sms });
  }

  // static async loginUser(req, res, next) {

  // }
}
