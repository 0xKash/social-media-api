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

  const users = await prisma.getUsers(req.query.limit, req.user.id);

  return res.json({
    status: "success",
    data: users,
  });
};
