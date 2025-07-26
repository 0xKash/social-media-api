// imports
const prisma = require("../db/post");
const {
  CustomBadRequestError,
  CustomNotAuthorizedError,
} = require("../errors/errors");

exports.getAllPosts = async (req, res) => {
  const posts = await prisma.getAllPosts();

  return res.json({
    status: "success",
    data: posts,
  });
};

exports.createPost = async (req, res) => {
  const content = req.body.content;
  const user = req.user;

  if (!content)
    throw new CustomBadRequestError(
      "Necessary input is missing",
      `${content} is missing or isn't valid`,
      "Make sure content is correctly written",
      req.originalUrl
    );

  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  const post = await prisma.createPost(user.id, content);

  return res.json({
    status: "success",
    data: post,
  });
};

exports.getPostById = async (req, res) => {
  if (!req.params.postId)
    // Checks if param is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "postId query parameter is missing",
      "Make sure the param is correctly written and not empty",
      req.originalUrl
    );

  const post = await prisma.getPostById(req.params.postId);

  return await res.json({
    status: "success",
    data: post,
  });
};
