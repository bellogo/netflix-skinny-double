import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_KEY;

export default (payload, secret = secretKey) => {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
};
