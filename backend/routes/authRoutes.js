const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET || "mysecretkey";


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {

    const { name, email, password, role, phone, address } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(400).json({ msg: "User already exists" });
    }

    const safeRole = role === "restaurant" ? "restaurant" : "user";

    const user = new User({
      name,
      email,
      password,   // plain password (model will hash it)
      role: safeRole,
      phone,
      address
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        _id:       user._id,
        name:      user.name,
        email:     user.email,
        role:      user.role,
        phone:     user.phone     || "",
        address:   user.address   || "",
        addresses: user.addresses || []
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;