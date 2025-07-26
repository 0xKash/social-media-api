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
        author: true,
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
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      handlePrismaError(err);
    }
  }
};
