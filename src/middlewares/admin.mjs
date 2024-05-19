export const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin === "isAdmin") {
    next();
  } else {
    res.status(401).json({
      message: "Forbiden",
    });
  }
};
