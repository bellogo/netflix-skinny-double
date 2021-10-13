import jwt from "jsonwebtoken";
import config from "../../config";

const secretKey = config.jwtKey;

export default (payload, secret = secretKey) => {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
};
