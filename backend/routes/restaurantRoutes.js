const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");

// ==============================
// Create Restaurant
// ==============================
router.post("/", async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// Get All Restaurants
// ==============================
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// Get Single Restaurant
// ==============================
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// Update Restaurant
// ==============================
router.put("/:id", async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// Delete Restaurant
// ==============================
router.delete("/:id", async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// Get Restaurant Menu
// ==============================
router.get("/:id/menu", async (req, res) => {
  try {
    const menuItems = await Menu.find({ restaurant: req.params.id });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;