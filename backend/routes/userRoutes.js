const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET;

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const safeRole = role === "restaurant" ? "restaurant" : "user";

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role:     safeRole,
      phone:    phone   || "",
      address:  address || ""
    });

    await user.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id:      user._id,
        name:    user.name,
        email:   user.email,
        role:    user.role,
        phone:   user.phone,
        address: user.address
      }
    });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        _id:     user._id,
        name:    user.name,
        email:   user.email,
        role:    user.role,
        phone:   user.phone   || "",
        address: user.address || "",
        addresses: user.addresses || []
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER PROFILE
router.get("/:id", async (req, res) => {
  try {

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;