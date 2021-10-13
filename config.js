// Import env package
require("dotenv").config({ silent: true, path: ".env" });

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  jwtKey: process.env.JWT_KEY,
  cookieKey: process.env.COOKIE_KEY,
  dbURL: process.env.DB_URL,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackURL: process.env.GOOGLE_CALLBACK_URL,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackURL: process.env.GITHUB_CALLBACK_URL
};
