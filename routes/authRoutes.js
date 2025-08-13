// imports
const { Router } = require("express");
const passport = require("passport");

const {
  registerUser,
  registerGithubUser,
  successLogin,
  failLogin,
  authUser,
} = require("../controllers/authController");
const { isAuth } = require("../lib/authMiddleware");

// setup
const authRouter = Router();

// get user data
authRouter.get("/", isAuth, authUser);

// register endpoints
authRouter.post("/register", registerUser);

// login endpoints
authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login/fail",
    successRedirect: "/auth/login/success",
  })
);

authRouter.get("/login/success", isAuth, successLogin);
authRouter.get("/login/fail", failLogin);

// github endpoints (OAuth)
authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect:
      "https://social-media-frontend-nine-mocha.vercel.app//home", // MUST change on production
  })
);

authRouter.get("/github/success", registerGithubUser, (req, res) =>
  res.redirect("/")
);

// logout endpoint
authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

// exports
module.exports = authRouter;
