const { StatusCodes } = require("http-status-codes");
const customAPIError = require("./custom-api");

class UnauthenticatedError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
