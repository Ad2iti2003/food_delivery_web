const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const multer = require("multer");
const path = require("path");

// ✅ Multer storage config — only once
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// CREATE with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    console.log("Body:", req.body);       // ✅ add this
    console.log("File:", req.file);       // ✅ add this
    console.log("Image path:", image);    // ✅ add this

    const newItem = new Menu({ name, price, description, image });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Menu save error:", error); // ✅ add this
    res.status(500).json({ message: "Error saving item" });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;