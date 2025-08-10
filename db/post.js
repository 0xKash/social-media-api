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
        comments: true,
        _count: {
          select: {
            likedBy: true,
            comments: true,
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

exports.deletePost = async (postId) => {
  try {
    return await prisma.post.delete({
      where: {
        id: Number(postId),
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
        author: {
          include: {
            followedBy: true,
          },
        },
        likedBy: true,
        comments: {
          include: {
            author: {
              include: {
                followedBy: true,
              },
            },
          },
        },
        _count: {
          select: {
            likedBy: true,
            comments: true,
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

exports.getPostsByUsername = async (username) => {
  try {
    return await prisma.post.findMany({
      where: {
        author: {
          is: {
            username: username,
          },
        },
      },
      include: {
        author: {
          include: {
            followedBy: true,
          },
        },
        likedBy: true,
        comments: {
          include: {
            author: {
              include: {
                followedBy: true,
              },
            },
          },
        },
        _count: {
          select: {
            likedBy: true,
            comments: true,
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

exports.createComment = async (postId, userId, content) => {
  try {
    return await prisma.comment.create({
      data: {
        content: content,
        post: {
          connect: { id: Number(postId) },
        },
        author: {
          connect: { id: Number(userId) },
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

exports.deleteComment = async (commentId) => {
  try {
    return await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};
