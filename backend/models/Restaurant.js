const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  address: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  cuisine: {
    type: String
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);