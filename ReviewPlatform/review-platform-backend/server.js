const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

//dotenv.config();
require("dotenv").config();
require("./config/cloudinary"); // AFTER dotenv

const app = express();

// connect database
connectDB();
// middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
// test route

// const createAdmin = async () => {
//   const existing = await User.findOne({ email: "admin@test.com" });

//   if (!existing) {
//     const hashedPassword = await bcrypt.hash("123456", 10);

//     await User.create({
//       name: "Admin",
//       email: "admin@test.com",
//       password: hashedPassword,
//       role: "admin",
//     });

//     console.log("Admin created");
//   } else {
//     console.log("Admin already exists");
//   }
// };

// // Call function
// createAdmin();
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});