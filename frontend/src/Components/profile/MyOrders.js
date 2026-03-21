import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>My Orders</Typography>
      <Typography sx={{ color: "#777", mb: 2 }}>
        View all your past and current orders.
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#ff9800", textTransform: "none" }}
        onClick={() => navigate("/my-orders")}
      >
        View My Orders
      </Button>
    </>
  );
}

export default MyOrders;
