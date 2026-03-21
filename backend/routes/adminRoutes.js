const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const Menu = require("../models/Menu");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// ✅ middleware applied per route, not globally
const adminAuth = [verifyToken, authorizeRoles("admin")];

// GET dashboard stats
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalUsers       = await User.countDocuments({ role: "user" });
    const totalRestaurants = await User.countDocuments({ role: "restaurant" });
    const totalOrders      = await Order.countDocuments();
    const totalMenuItems   = await Menu.countDocuments();

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const revenue = await Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.json({
      totalUsers,
      totalRestaurants,
      totalOrders,
      totalMenuItems,
      recentOrders,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    console.error("Stats error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET all users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE user
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all orders
router.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE order status
router.put("/orders/:id", adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;