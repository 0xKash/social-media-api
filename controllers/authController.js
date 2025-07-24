// imports
const utils = require("../lib/utils");
const prisma = require("../db/queries");

// This function checks if user's input is valid, creates a new user on db & issues a new JWT token
exports.registerUser = async (req, res) => {
  const { username, password, confirm_password } = req.body;

  if (password != confirm_password)
    return console.error("passwords don't coincide");

  const saltHash = utils.genPassword(password);
  const { salt, hash } = saltHash;

  const user = await prisma.createUser(username, hash, salt);

  res.json({
    status: "success",
    user: user,
  });
};
