// import bcrypt from "bcrypt";
// import { Admin } from "../models/admin.model.js";

// async function createUser(userData) {
//   const { username, email, password } = userData;

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create a new admin instance with hashed password
//   const createdUser = new Admin({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   // Save the user to the database
//   const savedUser = await createdUser.save();
//   return savedUser;
// }

// export default createUser
