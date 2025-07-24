// imports
const { PrismaClient, Prisma } = require("@prisma/client");

// prismaClient setup
const prisma = new PrismaClient();

// user queries
exports.getUserByName = async (username) => {
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
