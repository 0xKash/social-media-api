// imports
const { Router } = require("express");
const { isAuth } = require("../lib/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPostById,
} = require("../controllers/postController");

// setup
const postRouter = Router();

postRouter.get("/", isAuth, getAllPosts);
postRouter.post("/", isAuth, createPost);

postRouter.get("/:postId", isAuth, getPostById);

postRouter.post("/:postId/like", isAuth);
postRouter.post("/:postId/dislike", isAuth);

module.exports = postRouter;
