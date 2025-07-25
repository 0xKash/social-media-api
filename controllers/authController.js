// imports
const utils = require("../lib/utils");
const prisma = require("../db/queries");

// This function checks if user's input is valid, creates a new user on db & issues a new JWT token
exports.registerUser = async (req, res) => {
  const { username, password, confirm_password } = req.body;

  if (password != confirm_password) return res.send("Passwords don't coincide");

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
