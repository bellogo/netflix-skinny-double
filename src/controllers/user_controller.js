import hash from "../utilities/bcrypt";
import generateToken from "../utilities/jwt";
import userValidation from "../validations/user_validation";
import Users from "../models/user";

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
    console.log(newUser);
    const token = await generateToken({ newUser });
    return res.status(201).json({
      status: "success", code: 201, message: "user has been added successfully.", token
    });
  }
}
