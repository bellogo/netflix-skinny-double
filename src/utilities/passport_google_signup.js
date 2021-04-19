import { Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import Users from "../models/user";

dotenv.config();

const googleStrategySignUp = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await Users.findOne({ email: profile.emails[0].value });
    if (user) return done(null, { statusCode: 409, message: "user already exists." });

    const newUser = await Users.create({
      email: profile.emails[0].value,
      referenceId: profile.id,
      verified: profile.emails[0].verified
    });
    return done(null, newUser._id);
  }
);

export { googleStrategySignUp };
