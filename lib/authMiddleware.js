const { CustomNotAuthorizedError } = require("../errors/errors");
const prisma = require("../db/user");

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new CustomNotAuthorizedError(
      "You are not authorized",
      "User authentication is missing",
      "Try to authenticate correctly and try again",
      req.originalUrl
    );
  }
};

exports.changeGithubUserId = async (user) => {
  if (user.nodeId) {
    const githubUser = await prisma.getUserByGithubId(user.id);

    if (githubUser) {
      user.id = githubUser.id;
    }
  }
};
