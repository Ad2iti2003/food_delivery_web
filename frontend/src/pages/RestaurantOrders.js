import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip
} from "@mui/material";

export default function RestaurantOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Rahul Sharma",
      items: ["Burger", "Fries"],
      total: 350,
      status: "Pending"
    },
    {
      id: 2,
      customer: "Priya Singh",
      items: ["Pizza", "Coke"],
      total: 550,
      status: "Preparing"
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Preparing":
        return "info";
      case "Out for Delivery":
        return "secondary";
      case "Delivered":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        📦 Restaurant Orders
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} key={order.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Order #{order.id}
                </Typography>

                <Typography>
                  <strong>Customer:</strong> {order.customer}
                </Typography>

                <Typography mt={1}>
                  <strong>Items:</strong> {order.items.join(", ")}
                </Typography>

                <Typography mt={1}>
                  <strong>Total:</strong> ₹ {order.total}
                </Typography>

                <Box mt={2} display="flex" alignItems="center" gap={2}>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                  />

                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={order.status}
                      label="Status"
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Preparing">Preparing</MenuItem>
                      <MenuItem value="Out for Delivery">
                        Out for Delivery
                      </MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}