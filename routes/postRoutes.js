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
  createComment,
  deleteComment,
} = require("../controllers/postController");

// setup
const postRouter = Router();

postRouter.get("/", isAuth, getAllPosts);
postRouter.post("/", isAuth, createPost);

postRouter.get("/:postId", isAuth, getPostById);

postRouter.post("/:postId/likes", isAuth, likePost);
postRouter.delete("/:postId/likes", isAuth, dislikePost);

postRouter.post("/:postId/comments", isAuth, createComment);
postRouter.delete("/:postId/comments/:commentId", isAuth, deleteComment);

module.exports = postRouter;
