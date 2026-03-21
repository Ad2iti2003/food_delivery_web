const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const User = require("./models/User");

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: "admin@foodwagon.com" });
  if (existing) {
    console.log("Admin already exists!");
    process.exit();
  }

  const hashed = await bcrypt.hash("admin123", 10);
  await User.create({
    name:     "Admin",
    email:    "admin@foodwagon.com",
    password: hashed,
    role:     "admin"
  });

  console.log("✅ Admin created!");
  console.log("Email:    admin@foodwagon.com");
  console.log("Password: admin123");
  process.exit();
};

createAdmin();