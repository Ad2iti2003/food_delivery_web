const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create Razorpay order
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount:   amount * 100,
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

// ✅ Verify payment
router.post("/verify", verifyToken, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus:   "Paid",
      paymentId:       razorpay_payment_id,
      razorpayOrderId: razorpay_order_id
    });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed" });
  }
});

// ✅ Save payment method to user profile
router.post("/save-method", verifyToken, async (req, res) => {
  try {
    const { type, last4, upiId, cardHolder } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    // ✅ check for duplicate
    if (type === "upi") {
      const exists = user.paymentMethods.find(m => m.upiId === upiId);
      if (exists) {
        return res.status(400).json({ message: "UPI ID already saved" });
      }
    }
    if (type === "card") {
      const exists = user.paymentMethods.find(m => m.last4 === last4);
      if (exists) {
        return res.status(400).json({ message: "Card already saved" });
      }
    }

    const isPrimary = user.paymentMethods.length === 0;

    user.paymentMethods.push({ type, last4, upiId, cardHolder, isPrimary });
    await user.save();

    res.json({ message: "Payment method saved", paymentMethods: user.paymentMethods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete payment method
router.delete("/delete-method/:methodId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.paymentMethods = user.paymentMethods.filter(
      m => m._id.toString() !== req.params.methodId
    );
    await user.save();
    res.json({ message: "Payment method removed", paymentMethods: user.paymentMethods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
