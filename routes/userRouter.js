// imports
const { Router } = require("express");
const { isAuth } = require("../lib/authMiddleware");
const {
  followUser,
  getUsers,
  unfollowUser,
  getUser,
} = require("../controllers/userController");

// setup
const userRouter = Router();

userRouter.get("/", isAuth, getUsers); // query.limit available

userRouter.get("/:userId", isAuth, getUser);

userRouter.post("/:targetId/follow", isAuth, followUser);
userRouter.post("/:targetId/unfollow", isAuth, unfollowUser);

module.exports = userRouter;
