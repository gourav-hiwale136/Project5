const allowRoles = (...Roles) => {
  return (req, res, next) => {
    if (!Roles.includes(req.user.Role)) {
      return res.status(403).json({ message: "Access denied" });
    };
    next();
  };
};

export default allowRoles;
