// middlewares/roleMiddleware.js
const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.Role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  };
};

export default allowRoles;
