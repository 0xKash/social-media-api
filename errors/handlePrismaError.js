// imports
const { CustomPrismaError } = require("./errors");

const handlePrismaError = (err) => {
  switch (err.code) {
    // handling duplicate key errors
    case "P2002":
      throw new CustomPrismaError(
        err.code,
        `Duplicate field value: ${err.meta.target}`,
        400
      );

    // handling invalid id errors
    case "P2014":
      throw new CustomPrismaError(
        err.code,
        `Invalid ID: ${err.meta.target}`,
        400
      );

    // handling invalid data errors
    case "P2003":
      throw new CustomPrismaError(
        err.code,
        `Invalid input data: ${err.meta.target}`,
        400
      );

    // handling all other errors
    default:
      throw new CustomPrismaError(err.code, `Something went wrong`, 500);
  }
};

// exports
module.exports = handlePrismaError;
