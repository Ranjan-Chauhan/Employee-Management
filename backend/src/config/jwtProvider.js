// import jwt from "jsonwebtoken";

// // const secretKey = "jnasiuywhebruytyfghfytrujasjlkdiua0z9ujknwejhyiueywqjhweui";

// const secretKey = process.env.JWT_SECRET;

// export function generateToken(user) {
//   const payload = {
//     id: user._id,
//     email: user.email,
//     username: user.username,
//   };

// //   return jwt.sign(payload, secretKey, { expiresIn: "24h" });
// // }
// import jwt from "jsonwebtoken";

// export const generateToken = (user) => {
//   const payload = {
//     id: user._id,
//     email: user.email,
//   };

//   // Sign token with secret key
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
// };
