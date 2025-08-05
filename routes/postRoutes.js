// imports
const { Router } = require("express");
const { isAuth } = require("../lib/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  dislikePost,
  getPostLikesCount,
} = require("../controllers/postController");

// setup
const postRouter = Router();

postRouter.get("/", isAuth, getAllPosts);
postRouter.post("/", isAuth, createPost);

postRouter.get("/:postId", isAuth, getPostById);

postRouter.post("/:postId/likes", isAuth, likePost);
postRouter.delete("/:postId/likes", isAuth, dislikePost);

module.exports = postRouter;
