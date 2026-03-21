import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Typography, Paper, Chip,
  Divider, CircularProgress
} from "@mui/material";

const statusColors = {
  "Pending":          "warning",
  "Preparing":        "info",
  "Out for Delivery": "secondary",
  "Delivered":        "success",
  "Cancelled":        "error"
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{
        minHeight: "80vh", display: "flex",
        flexDirection: "column", alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography variant="h5">📦 No orders yet</Typography>
        <Typography color="text.secondary" mt={1}>
          Place your first order!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📦 My Orders
      </Typography>

      {orders.map((order) => (
        <Paper key={order._id} elevation={2}
          sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}>

          {/* Order Header */}
          <Box sx={{
            p: 2, backgroundColor: "#fff8f0",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 1
          }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Order ID: {order._id.slice(-8).toUpperCase()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>
            <Chip
              label={order.status}
              color={statusColors[order.status] || "default"}
            />
          </Box>

          <Divider />

          {/* Order Items */}
          <Box sx={{ p: 2 }}>
            {order.items.map((item, i) => (
              <Box key={i} sx={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", mb: 1
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {item.image && (
                    <Box component="img"
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      sx={{ width: 50, height: 50, borderRadius: 1, objectFit: "cover" }}
                    />
                  )}
                  <Typography>
                    {item.name} × {item.quantity}
                  </Typography>
                </Box>
                <Typography fontWeight="bold">
                  ₹{item.price * item.quantity}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider />

          {/* Order Footer */}
          <Box sx={{
            p: 2, display: "flex",
            justifyContent: "space-between", alignItems: "center"
          }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                📍 {order.deliveryAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                💳 {order.paymentMethod}
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold" color="orange">
              ₹{order.totalPrice}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}