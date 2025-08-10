// imports
const { Router } = require("express");
const { isAuth } = require("../lib/authMiddleware");
const multer = require("multer");
const {
  followUser,
  getUsers,
  unfollowUser,
  getUser,
  getUserByUsername,
  updateDescription,
  updateAvatar,
} = require("../controllers/userController");

// setup
const userRouter = Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

userRouter.get("/", isAuth, getUsers); // query.limit available

userRouter.put("/avatar", isAuth, upload.single("avatar"), updateAvatar);
userRouter.put("/description", isAuth, updateDescription);

userRouter.get("/:userId", isAuth, getUser);

userRouter.get("/users/:username", isAuth, getUserByUsername);

userRouter.put("/users/:username/avatar", isAuth);
userRouter.put("/users/:username/description", isAuth, updateDescription);

userRouter.post("/:targetId/follow", isAuth, followUser);
userRouter.post("/:targetId/unfollow", isAuth, unfollowUser);

module.exports = userRouter;
