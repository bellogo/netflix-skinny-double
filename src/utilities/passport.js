import passport from "passport";
import passportgoogleoauth20 from "passport-google-oauth20";
import passportgithub2 from "passport-github2";
import dotenv from "dotenv";
import Users from "../models/user";

const StrategyGoogle = passportgoogleoauth20.Strategy;
const StrategyGithub = passportgithub2.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  const userDetails = await Users.findOne({ _id: user });
  done(null, userDetails);
});

dotenv.config();

passport.use(new StrategyGoogle(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await Users.findOne({ referenceId: profile.id });
    if (user) return done(null, user._id);

    const newUser = await Users.create({
      email: profile.emails[0].value,
      name: profile._json.name,
      referenceId: profile.id,
      verified: profile.emails[0].verified
    });
    return done(null, newUser._id);
  }
));

passport.use(new StrategyGithub(
  {
    clientID: process.env.CLIENT_ID_GITHUB,
    clientSecret: process.env.CLIENT_SECRET_GITHUB,
    callbackURL: process.env.CALLBACK_URL_GITHUB,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await Users.findOne({ referenceId: profile.id });
    if (user) return done(null, user._id);

    const newUser = await Users.create({
      email: profile.emails[0].value,
      referenceId: profile.id,
      verified: true,
      name: profile.displayName
    });
    return done(null, newUser._id);
  }
));
