// imports
const { Router } = require("express");

// setup
const authRouter = Router();

// endpoints
authRouter.post("/register", (req, res) => res.send("register"));
authRouter.post("/login", (req, res) => res.send("login"));

// exports
module.exports = authRouter;
