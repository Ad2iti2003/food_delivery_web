import React, { useState } from "react";
import {
  Box, Typography, Button, Divider, IconButton,
  Paper, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const {
    cart, removeFromCart, increaseQty,
    decreaseQty, totalPrice, clearCart
  } = useCart();

  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setError("Please enter a delivery address.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderItems = cart.map((item) => ({
        menuItem: item._id,
        name:     item.name,
        price:    item.price,
        quantity: item.quantity,
        image:    item.image
      }));

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: orderItems,
          totalPrice,
          deliveryAddress: address,
          paymentMethod
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("🎉 Order placed successfully!");
      clearCart();

      setTimeout(() => navigate("/my-orders"), 2000);

   } catch (err) {
  // ✅ shows actual backend error instead of generic message
  setError(err.response?.data?.message || err.message || "Failed to place order.");
} finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !success) {
    return (
      <Box sx={{
        minHeight: "80vh", display: "flex",
        flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 2
      }}>
        <Typography variant="h5">🛒 Your cart is empty</Typography>
        <Button variant="contained" color="warning" onClick={() => navigate("/")}>
          Browse Menu
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>🛒 Your Cart</Typography>

      {error   && <Alert severity="error"   sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Cart Items */}
      {cart.length > 0 && (
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden", mb: 3 }}>
          {cart.map((item, index) => (
            <Box key={item._id}>
              <Box sx={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", p: 2
              }}>
                <Box
                  component="img"
                  src={
                    item.image
                      ? `http://localhost:5000${item.image}`
                      : "https://source.unsplash.com/80x80?food"
                  }
                  alt={item.name}
                  sx={{ width: 70, height: 70, borderRadius: 2, objectFit: "cover" }}
                />

                <Box sx={{ flex: 1, mx: 2 }}>
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography color="orange" fontWeight="bold">
                    ₹{item.price}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton size="small" onClick={() => decreaseQty(item._id)}
                    sx={{ border: "1px solid #ddd" }}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography fontWeight="bold" sx={{ minWidth: 24, textAlign: "center" }}>
                    {item.quantity}
                  </Typography>
                  <IconButton size="small" onClick={() => increaseQty(item._id)}
                    sx={{ border: "1px solid #ddd" }}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Box sx={{ ml: 2, textAlign: "right" }}>
                  <Typography fontWeight="bold">₹{item.price * item.quantity}</Typography>
                  <IconButton color="error" size="small"
                    onClick={() => removeFromCart(item._id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {index < cart.length - 1 && <Divider />}
            </Box>
          ))}
        </Paper>
      )}

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {/* Delivery + Payment */}
        <Paper elevation={2} sx={{ flex: 1, minWidth: 280, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Delivery Details</Typography>

          <TextField
            fullWidth multiline rows={3}
            label="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl>
            <FormLabel>Payment Method</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="Cash on Delivery"
                control={<Radio color="warning" />}
                label="Cash on Delivery"
              />
              <FormControlLabel
                value="Online"
                control={<Radio color="warning" />}
                label="Online Payment"
              />
            </RadioGroup>
          </FormControl>
        </Paper>

        {/* Order Summary */}
        <Paper elevation={2} sx={{ width: 300, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" mb={2}>Order Summary</Typography>
          <Divider sx={{ mb: 2 }} />

          {cart.map((item) => (
            <Box key={item._id} sx={{
              display: "flex", justifyContent: "space-between", mb: 1
            }}>
              <Typography variant="body2">
                {item.name} × {item.quantity}
              </Typography>
              <Typography variant="body2">₹{item.price * item.quantity}</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Delivery</Typography>
            <Typography color="green">FREE</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">Total</Typography>
            <Typography variant="h6" fontWeight="bold" color="orange">
              ₹{totalPrice}
            </Typography>
          </Box>

          <Button fullWidth variant="contained" disabled={loading}
            sx={{ backgroundColor: "#ff9800", py: 1.5, fontSize: 16, mb: 1 }}
            onClick={handlePlaceOrder}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>

          <Button fullWidth variant="outlined" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}