require("dotenv").config();

// imports
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const prisma = require("../db/user");
const { validPassword } = require("../lib/utils");
const { changeGithubUserId } = require("../lib/authMiddleware");

// setup of GithubStrategy (OAuth)
const githubOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

const githubStrategy = new GithubStrategy(
  githubOptions,
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
);

// setup of LocalStrategy

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await prisma.getUserByUsername(username);

    if (!user) return done(null, false, { message: "Incorrect username" });
    if (!validPassword(password, user.hash, user.salt))
      return done(null, false, { message: "Incorrect password" });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  // If user signs in with github, the id stored in db is applied to req.user.id
  changeGithubUserId(user);

  done(null, user);
});

// exports
module.exports = (passport) => {
  passport.use("github", githubStrategy);
  passport.use("local", localStrategy);
};
