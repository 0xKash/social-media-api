// imports
const { Router } = require("express");
const { isAuth } = require("../lib/authMiddleware");
const { followUser, getUsers } = require("../controllers/userController");

// setup
const userRouter = Router();

userRouter.get("/", isAuth, getUsers); // query.limit available

userRouter.post("/:targetId/follow", isAuth, followUser);

module.exports = userRouter;
