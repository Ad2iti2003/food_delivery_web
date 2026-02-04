const express = require("express");
const mongoose = require("mongoose");
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

mongoose.connect("mongodb://127.0.0.1:27017/foodapp")
.then(() => console.log("DB Connected"));

app.get("/api/items", (req, res) => {
  res.json(items);
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/recommend", require("./routes/recommendRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});