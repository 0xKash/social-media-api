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
      include: {
        followedBy: true,
        _count: {
          select: {
            followedBy: true,
            following: true,
          },
        },
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};

exports.getUserById = async (userId) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        followedBy: true,
        _count: {
          select: {
            followedBy: true,
            following: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};

exports.getUserByGithubId = async (githubId) => {
  try {
    return await prisma.user.findUnique({
      where: {
        github_id: Number(githubId),
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
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        following: {
          connect: [{ id: Number(targetId) }],
        },
      },
    });

    const target = await prisma.user.update({
      where: { id: Number(targetId) },
      data: {
        followedBy: {
          connect: [{ id: Number(userId) }],
        },
      },
    });

    return { user, target };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};

exports.unfollowUser = async (userId, targetId) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        following: {
          disconnect: [{ id: Number(targetId) }],
        },
      },
    });

    const target = await prisma.user.update({
      where: { id: Number(targetId) },
      data: {
        followedBy: {
          disconnect: [{ id: Number(userId) }],
        },
      },
    });

    return { user, target };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};

exports.getNotFollowingUsers = async (limit, userId) => {
  try {
    return await prisma.user.findMany({
      take: Number(limit),
      where: {
        NOT: [
          {
            id: Number(userId),
          },
          {
            followedBy: {
              some: {
                id: Number(userId),
              },
            },
          },
        ],
      },
      include: {
        followedBy: true,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};
