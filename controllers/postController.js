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

exports.deletePost = async (req, res) => {
  if (!req.params.postId)
    throw new CustomBadRequestError(
      "Necessary input is missing",
      `${req.params.postId} (params.postId) is missing or isn't valid`,
      "Make sure postId is correctly written",
      req.originalUrl
    );

  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  const post = await prisma.deletePost(req.params.postId);

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

exports.getPostsByUsername = async (req, res) => {
  if (!req.params.username)
    // Checks if param is missing
    throw new CustomBadRequestError(
      "Necessary input missing",
      "username query parameter is missing",
      "Make sure the param is correctly written and not empty",
      req.originalUrl
    );

  const posts = await prisma.getPostsByUsername(req.params.username);

  return await res.json({
    status: "success",
    data: posts,
  });
};

exports.likePost = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  const post = await prisma.likePost(req.params.postId, req.user.id);

  return res.json({
    status: "success",
    data: post,
  });
};

exports.dislikePost = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  const post = await prisma.dislikePost(req.params.postId, req.user.id);

  return res.json({
    status: "success",
    data: post,
  });
};

exports.createComment = async (req, res) => {
  const { user } = req;
  const { content } = req.body;

  if (!user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  if (!content)
    throw new CustomBadRequestError(
      "Necessary input is missing",
      `${content} is missing or isn't valid`,
      "Make sure content is correctly written",
      req.originalUrl
    );

  const comment = await prisma.createComment(
    req.params.postId,
    user.id,
    content
  );

  res.json({
    status: "success",
    data: comment,
  });
};

exports.deleteComment = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  const comment = await prisma.deleteComment(req.params.commentId);

  res.json({
    status: "success",
    data: comment,
  });
};
