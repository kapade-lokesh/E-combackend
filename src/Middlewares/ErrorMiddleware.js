import ApiError from "../Utils/ApiError";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Handle unexpected errors
  console.error("Unexpected error:", err);
  return res.status(500).json({
    status: "error",
    error: {
      code: "SERVER_ERROR",
      message: "Internal server error",
    },
  });
};

export default errorHandler;
