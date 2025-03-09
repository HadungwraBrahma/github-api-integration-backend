export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  const statusCode = err.statusCode || err.response?.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: statusCode === 500 ? "Internal Server Error" : errorMessage,
    message: err.response?.data?.message || errorMessage,
  });
};
