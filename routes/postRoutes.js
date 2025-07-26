// imports
const { Router } = require("express");
const { isAuth } = require("../lib/authMiddleware");

// setup
const postRouter = Router();

postRouter.get("/", isAuth /* getAllPosts */);
postRouter.post("/", isAuth /* createPost */);

postRouter.get("/:postId", isAuth /*getPostById */);

module.exports = postRouter;
