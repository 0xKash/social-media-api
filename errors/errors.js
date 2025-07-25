class CustomNotFoundError extends Error {
  constructor(message, details, suggestion, path) {
    super(message);
    this.status = "error";
    this.statusCode = 404;
    this.error = {
      code: "RESOURCE_NOT_FOUND",
      message: message,
      details: details,
      suggestion: suggestion,
      path: path,
    };
  }
}

class CustomNotAuthorizedError extends Error {
  constructor(message, details, suggestion, path) {
    super(message);
    this.status = "error";
    this.statusCode = 401;
    this.error = {
      code: "NOT_AUTHORIZED",
      message: message,
      details: details,
      suggestion: suggestion,
      path: path,
    };
  }
}

class CustomInternalServerError extends Error {
  constructor(message, details) {
    super(message);
    this.status = "error";
    this.statusCode = 500;
    this.error = {
      code: "INTERNAL_SERVER_ERROR",
      message: message,
      details: details,
    };
  }
}

class CustomBadRequestError extends Error {
  constructor(message, details, suggestion, path) {
    super(message);
    this.status = "error";
    this.statusCode = 400;
    this.error = {
      code: "BAD_REQUEST",
      message: message,
      details: details,
      suggestion: suggestion,
      path: path,
    };
  }
}

class CustomPrismaError extends Error {
  constructor(prismaCode, message, statusCode) {
    super(prismaCode, message);
    this.status = "error";
    this.statusCode = statusCode;
    this.error = {
      prismaCode: prismaCode,
      message: message,
    };
  }
}

// exports
module.exports = {
  CustomNotFoundError,
  CustomNotAuthorizedError,
  CustomInternalServerError,
  CustomBadRequestError,
  CustomPrismaError,
};
