// imports
const { Router } = require("express");
const passport = require("passport");
const { registerUser } = require("../controllers/authController");

// setup
const authRouter = Router();

// register endpoints
authRouter.get("/register", (req, res) => res.send("register"));
authRouter.post("/register", registerUser);

// login endpoints
authRouter.get("/login", (req, res) => res.send("Please log in"));
authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "auth/register",
    successRedirect: "/test",
  })
);

// github endpoints (OAuth)
authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

// logout endpoint
authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

// exports
module.exports = authRouter;
