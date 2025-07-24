// imports
const { PrismaClient, Prisma } = require("@prisma/client");

// prismaClient setup
const prisma = new PrismaClient();

// user queries

exports.createUser = async (username, hash, salt) => {
  try {
    return await prisma.user.create({
      data: {
        username: username,
        hash: hash,
        salt: salt,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // HANDLE PRISMA ERROR
    }
  }
};

exports.getUserByUsername = async (username) => {
  try {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // HANDLE PRISMA ERROR
    }
  }
};
