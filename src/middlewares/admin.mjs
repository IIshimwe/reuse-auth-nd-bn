export const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "FORBIDDEN.",
    });
  }
};
