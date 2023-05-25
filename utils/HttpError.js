class HttpError extends Error {
  constructor(statusCode, message) {
    super(message || defaultErrorMessage[statusCode]);
    this.statusCode = statusCode;
  }
}

const defaultErrorMessage = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  422: "Unprocessable Entity",
  500: "Server Error",
};

module.exports = { HttpError };
