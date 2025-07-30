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
