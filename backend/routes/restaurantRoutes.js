const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


router.get(
  "/orders",
  verifyToken,
  authorizeRoles("restaurant"),
  (req, res) => {
    res.json({ msg: "Restaurant Orders" });
  }
);

module.exports = router;