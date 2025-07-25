// imports
const utils = require("../lib/utils");
const prisma = require("../db/queries");
const { CustomBadRequestError } = require("../errors/errors");

// This function checks if user's input is valid, creates a new user on db & issues a new JWT token
exports.registerUser = async (req, res) => {
  const { username, password, confirm_password } = req.body;

  if (password != confirm_password)
    throw new CustomBadRequestError(
      "Passwords don't match",
      "password and confirm_password don't have same value",
      "Make sure both are correctly written",
      req.originalUrl
    );

  const saltHash = utils.genPassword(password);
  const { salt, hash } = saltHash;

  const user = await prisma.createUser(username, hash, salt);

  res.json({
    status: "success",
    data: user,
  });
};

exports.registerGithubUser = async (req, res, next) => {
  const { id, username } = req.user;
  const avatar = req.user.photos[0].value;

  const value = await prisma.getUserByUsername(username);

  if (value != null) return next(); // Alredy registered

  await prisma.createGithubUser(id, username, avatar);
  next();
};
