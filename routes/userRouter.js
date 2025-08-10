// imports
const { Router } = require("express");
const { isAuth } = require("../lib/authMiddleware");
const {
  followUser,
  getUsers,
  unfollowUser,
  getUser,
  getUserByUsername,
  updateDescription,
} = require("../controllers/userController");

// setup
const userRouter = Router();

userRouter.get("/", isAuth, getUsers); // query.limit available

userRouter.get("/:userId", isAuth, getUser);

userRouter.get("/users/:username", isAuth, getUserByUsername);

userRouter.put("/users/:username/avatar", isAuth);
userRouter.put("/users/:username/description", isAuth, updateDescription);

userRouter.post("/:targetId/follow", isAuth, followUser);
userRouter.post("/:targetId/unfollow", isAuth, unfollowUser);

module.exports = userRouter;
