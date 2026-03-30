const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create Razorpay order
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    const options = {
      amount:   amount * 100, // convert to paise
      currency: "INR",
      receipt:  `receipt_${Date.now()}`
    };

    const razorpayOrder = await razorpay.orders.create(options);
    res.json(razorpayOrder);
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ message: "Error creating payment order" });
  }
});

// ✅ Verify payment after success
router.post("/verify", verifyToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId // our MongoDB order ID
    } = req.body;

    // ✅ Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ Update order payment status in DB
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus:    "Paid",
      paymentId:        razorpay_payment_id,
      razorpayOrderId:  razorpay_order_id
    });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

module.exports = router;