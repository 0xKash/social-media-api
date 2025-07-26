// imports
const { PrismaClient, Prisma } = require("@prisma/client");
const handlePrismaError = require("../errors/handlePrismaError");

// prismaClient setup
const prisma = new PrismaClient();

// post queries

exports.getAllPosts = async () => {
  try {
    return await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
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
        user: {
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
        user: true,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};
