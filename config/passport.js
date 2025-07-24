require("dotenv").config();

// imports
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;

// options of passport strategy
const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

const strategy = new GithubStrategy(
  options,
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// exports
module.exports = (passport) => {
  passport.use(strategy);
};
