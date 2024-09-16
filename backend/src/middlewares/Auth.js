// import jwt from "jsonwebtoken";
// // const jwt = require("jsonwebtoken");

// const ensureAuthenticated = (req, res, next) => {
//   const auth = req.headers["authorization"];
//   if (!auth) {
//     return res
//       .status(403)
//       .json({ message: "Unauthorized, JWT token is required" });
//   }
//   try {
//     const decoded = jwt.verify(auth, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res
//       .status(403)
//       .json({ message: "Unauthorized, JWT token wrong or expired" });
//   }
// };

// module.exports = ensureAuthenticated;

// import jwt from "jsonwebtoken";

// export const verifyJWT = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Expecting 'Bearer <token>'

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied, no token provided" });
//   }

//   try {
//     // Verify the token using your JWT secret
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach the user details to the request object (you can access this in the route)
//     req.user = decoded;

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is provided in the request
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Add decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
