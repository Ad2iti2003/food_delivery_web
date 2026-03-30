const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      name:     { type: String },
      price:    { type: Number },
      quantity: { type: Number },
      image:    { type: String }
    }
  ],
  totalPrice:      { type: Number, required: true },
  status:          {
    type: String,
    enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Pending"
  },
  deliveryAddress: { type: String, required: true },
  paymentMethod:   {
    type: String,
    enum: ["Cash on Delivery", "Online"],
    default: "Cash on Delivery"
  },
  // ✅ new payment fields
  paymentStatus:   {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  paymentId:       { type: String, default: "" },
  razorpayOrderId: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);