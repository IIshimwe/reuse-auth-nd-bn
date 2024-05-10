import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = await req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!validToken) return res.status(403).json({ message: "forbidden" });

    req.user = decodedPayload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
