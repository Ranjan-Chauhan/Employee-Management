import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  // Get token from the request header
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallbackSecret"
    );

    // Attach user data to the request object
    req.user = decoded; // This will allow you to access `req.user` in the next middleware/controller

    next(); // Move to the next middleware or controller
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
