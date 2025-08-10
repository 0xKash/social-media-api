const { decode } = require("base64-arraybuffer");
const prisma = require("../db/user");
const supabase = require("../supabase/supabase");
const {
  CustomBadRequestError,
  CustomNotAuthorizedError,
  CustomNotFoundError,
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

  if (!req.params.userId)
    throw new CustomBadRequestError(
      "Necessary input is missing",
      `${req.params.userId} (params.userId) is missing or isn't valid`,
      "Make sure userId is correctly written",
      req.originalUrl
    );

  const user = await prisma.getUserById(req.params.userId);

  return res.json({
    status: "success",
    data: user,
  });
};

exports.getUserByUsername = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  if (!req.params.username)
    throw new CustomBadRequestError(
      "Necessary input is missing",
      `${req.params.username} (params.username) is missing or isn't valid`,
      "Make sure username is correctly written",
      req.originalUrl
    );

  const user = await prisma.getUserByUsername(req.params.username);

  return res.json({
    status: "success",
    data: user,
  });
};

exports.updateDescription = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  if (!req.body.description)
    throw new CustomBadRequestError(
      "Necessary input is missing",
      `${req.body.description} (body.description) is missing or isn't valid`,
      "Make sure description is correctly written",
      req.originalUrl
    );

  const user = await prisma.updateDescription(
    req.body.description,
    req.user.id
  );

  return res.json({
    status: "success",
    data: user,
  });
};

exports.updateAvatar = async (req, res) => {
  if (!req.user)
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );

  if (!req.file) {
    throw new CustomBadRequestError(
      "Necessary input missing",
      "File is missing",
      "Please upload a file",
      req.originalUrl
    );
  }

  const avatarFile = decode(req.file.buffer.toString("base64"));

  const { data } = await supabase.updateAvatar(req.user.id, avatarFile);
  const { avatar } = await prisma.updateAvatar(req.user.id, data.publicUrl);

  res.json({
    status: "success",
    data: avatar,
  });
};
