import passport from "passport";
import passportgoogleoauth20 from "passport-google-oauth20";
import passportgithub2 from "passport-github2";
import Users from "../models/user";
import config from "../../config";

const StrategyGoogle = passportgoogleoauth20.Strategy;
const StrategyGithub = passportgithub2.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  const userDetails = await Users.findOne({ _id: user });
  done(null, userDetails);
});

passport.use(new StrategyGoogle(
  {
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: config.googleCallbackURL,
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
    clientID: config.githubClientID,
    clientSecret: config.githubClientSecret,
    callbackURL: config.githubCallbackURL,
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
