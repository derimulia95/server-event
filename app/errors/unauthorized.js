const { StatusCodes } = require("http-status-codes");
const customAPIError = require("./custom-api");

class Unauthorized extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
