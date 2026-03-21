import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Typography, Card, CardContent, Grid,
  MenuItem, Select, FormControl, InputLabel,
  Chip, CircularProgress, Alert
} from "@mui/material";

const statusColors = {
  "Pending":          "warning",
  "Preparing":        "info",
  "Out for Delivery": "secondary",
  "Delivered":        "success",
  "Cancelled":        "error"
};

export default function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/orders/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(orders.map((o) =>
        o._id === id ? { ...o, status: newStatus } : o
      ));
    } catch {
      setError("Failed to update status.");
    }
  };

  if (loading) return <CircularProgress color="warning" />;

  return (
    <Box>
      <Typography variant="h4" mb={3}>📦 Restaurant Orders</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {orders.length === 0 ? (
        <Typography color="text.secondary">No orders yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} key={order._id}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.createdAt).toLocaleString()}
                  </Typography>

                  {order.user && (
                    <Typography mt={1}>
                      <strong>Customer:</strong> {order.user.name} — {order.user.email}
                    </Typography>
                  )}

                  <Typography mt={1}>
                    <strong>Items:</strong>{" "}
                    {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                  </Typography>

                  <Typography mt={1}>
                    <strong>Address:</strong> {order.deliveryAddress}
                  </Typography>

                  <Typography mt={1}>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </Typography>

                  <Typography mt={1} color="orange" fontWeight="bold">
                    Total: ₹{order.totalPrice}
                  </Typography>

                  <Box mt={2} display="flex" alignItems="center" gap={2}>
                    <Chip
                      label={order.status}
                      color={statusColors[order.status] || "default"}
                    />
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                      <InputLabel>Update Status</InputLabel>
                      <Select
                        value={order.status}
                        label="Update Status"
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Preparing">Preparing</MenuItem>
                        <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}