const prisma = require("../db/user");
const {
  CustomBadRequestError,
  CustomNotAuthorizedError,
} = require("../errors/errors");

exports.followUser = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  const follow = await prisma.followUser(req.user.id, req.params.targetId);

  return res.json({
    status: "success",
    data: follow,
  });
};

exports.unfollowUser = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  const unfollow = await prisma.unfollowUser(req.user.id, req.params.targetId);

  return res.json({
    status: "success",
    data: unfollow,
  });
};

exports.getUsers = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  if (!req.query.limit)
    throw new CustomBadRequestError(
      "Necessary input is missing",
      `${req.query.limit} (query.limit) is missing or isn't valid`,
      "Make sure limit is correctly written",
      req.originalUrl
    );

  const users = await prisma.getNotFollowingUsers(req.query.limit, req.user.id);

  return res.json({
    status: "success",
    data: users,
  });
};

exports.getUser = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  const user = await prisma.getUserById(req.params.userId);

  return res.json({
    status: "success",
    data: user,
  });
};
