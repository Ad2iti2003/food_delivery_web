const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const items = [
  { id: 1, name: "Burger", price: 4 },
  { id: 2, name: "Pizza", price: 6 },
  { id: 3, name: "Sandwich", price: 3 },
  { id: 2, name: "Pizza", price: 6 },
  { id: 3, name: "Sandwich", price: 3 }
];

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});