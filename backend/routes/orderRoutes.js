const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Place new order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, totalPrice, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }
    if (!deliveryAddress) {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    const order = new Order({
      user: req.user.id,
      items,
      totalPrice,
      deliveryAddress,
      paymentMethod
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
 } catch (error) {
  console.error("Order error:", error.message); // ✅ shows real error
  res.status(500).json({ message: error.message }); // ✅ sends real error to frontend
}
});

// ✅ Get orders for logged in user
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// ✅ Get all orders (for restaurant)
router.get("/all", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// ✅ Update order status (for restaurant)
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
});

module.exports = router;