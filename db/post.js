// imports
const { PrismaClient, Prisma } = require("@prisma/client");
const handlePrismaError = require("../errors/handlePrismaError");

// prismaClient setup
const omitConfig = {
  user: { hash: true, salt: true },
};
const prisma = new PrismaClient({ omit: omitConfig });

// post queries

exports.getAllPosts = async () => {
  try {
    return await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        author: {
          include: {
            followedBy: true,
          },
        },
        likedBy: true,
        _count: {
          select: {
            likedBy: true,
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

exports.createPost = async (userId, content) => {
  try {
    return await prisma.post.create({
      data: {
        content: content,
        author: {
          connect: { id: Number(userId) },
        },
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};

exports.getPostById = async (postId) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      include: {
        author: true,
        likedBy: true,
        _count: {
          select: {
            likedBy: true,
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

exports.likePost = async (postId, userId) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        likedBy: {
          connect: [{ id: Number(userId) }],
        },
      },
    });

    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        likedPosts: {
          connect: [{ id: Number(postId) }],
        },
      },
    });

    return { post, user };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};

exports.dislikePost = async (postId, userId) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        likedBy: {
          disconnect: [{ id: Number(userId) }],
        },
      },
    });

    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        likedPosts: {
          disconnect: [{ id: Number(postId) }],
        },
      },
    });

    return { post, user };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};
