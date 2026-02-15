const express = require("express");
const router = express.Router();

// POST: /api/recommend
router.post("/", (req, res) => {
    const { foodName } = req.body;

    if (!foodName) {
        return res.status(400).json({ message: "Food name required" });
    }

    // simple recommendation logic
    const recommendations = {
        burger: ["Pizza", "Sandwich"],
        pizza: ["Burger", "Pasta"],
        sandwich: ["Burger", "Fries"]
    };

    const result =
        recommendations[foodName.toLowerCase()] || ["No recommendation found"];

    res.json({
        selected: foodName,
        recommended: result
    });
});

module.exports = router;

