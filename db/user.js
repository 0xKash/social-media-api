// imports
const { PrismaClient, Prisma } = require("@prisma/client");
const handlePrismaError = require("../errors/handlePrismaError");

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
      handlePrismaError(err);
    }
  }
};

exports.createGithubUser = async (githubId, username, avatar) => {
  try {
    return await prisma.user.create({
      data: {
        github_id: Number(githubId),
        username: username,
        avatar: avatar,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
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
      handlePrismaError(err);
    }
  }
};

exports.followUser = async (userId, targetId) => {
  try {
    return await prisma.follows.create({
      data: {
        followedBy: {
          connect: { id: Number(userId) },
        },
        following: {
          connect: { id: Number(targetId) },
        },
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};

exports.getUsers = async (limit, userId) => {
  try {
    return await prisma.user.findMany({
      take: Number(limit),
      where: {
        // Excluye al propio usuario
        NOT: [
          {
            id: Number(userId),
          },
          {
            followedBy: {
              some: {
                followedById: Number(userId),
              },
            },
          },
        ],
      },
      include: {
        followedBy: true,
        following: true,
      },
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};
