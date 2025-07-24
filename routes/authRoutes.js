// imports
const { Router } = require("express");
const passport = require("passport");

// setup
const authRouter = Router();

// endpoints
authRouter.get("/register", (req, res) => res.send("register"));
authRouter.get("/login", (req, res) => res.send("Please log in"));

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

authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

// exports
module.exports = authRouter;
