const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  description: { type: String },
  image:       { type: String, default: "" },  // ✅ added
  restaurant:  { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);