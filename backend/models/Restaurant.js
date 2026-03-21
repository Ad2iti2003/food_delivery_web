const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
  email: String,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);