const { CustomNotAuthorizedError } = require("../errors/errors");

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
