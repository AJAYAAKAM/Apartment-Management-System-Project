const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {

    // Check if user is logged in
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    // Check user's role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission."
      });
    }

    // User has permission
    next();
  };
};

module.exports = allowRoles;