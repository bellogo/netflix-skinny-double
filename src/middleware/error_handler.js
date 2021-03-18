export default (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "server error",
    data: err.data || null,
  });
};
