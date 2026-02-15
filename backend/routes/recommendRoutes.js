router.post("/", (req, res) => {
    const { foodName } = req.body;

    if (!foodName) {
        return res.status(400).json({ message: "Food name required" });
    }

    const recommendations = {
        burger: ["Pizza", "Sandwich"],
        pizza: ["Burger", "Pasta"],
        sandwich: ["Burger", "Fries"]
    };

    const result = recommendations[foodName.toLowerCase()] || [];

    res.json({
        selected: foodName,
        recommended: result
    });
});

