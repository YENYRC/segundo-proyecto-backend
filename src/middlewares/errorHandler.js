export const errorHandler = (err, req, res, next) => {
  console.error("ERROR CAPTURADO:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Error interno del servidor",
  });
};