class ApiError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = "error";
    this.code = code;
    this.message = message;
    Error.captureStackTrace(this, this.constructor); // Preserve stack trace
  }

  toJSON() {
    return {
      status: this.status,
      error: {
        code: this.code,
        message: this.message,
      },
    };
  }
}

export default ApiError;
