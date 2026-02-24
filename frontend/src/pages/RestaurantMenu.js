import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  CircularProgress,
  Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      setError("Failed to load menu.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddItem = async () => {
    if (!form.name || !form.price) {
      setError("Name and Price are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        "http://localhost:5000/api/menu",
        form
      );

      setMenuItems([...menuItems, res.data]);
      setForm({ name: "", price: "", description: "" });
      setSuccess("Item added successfully!");
    } catch (err) {
      setError("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
      setSuccess("Item deleted successfully!");
    } catch (err) {
      setError("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        🍔 Manage Menu
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Add Menu Form */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          backgroundColor: "#fff"
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Item
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Item Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddItem}
              sx={{
                backgroundColor: "#ff9800",
                "&:hover": { backgroundColor: "#e68900" }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Add Item"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Menu Items List */}
      {loading && <CircularProgress />}

      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} md={4} key={item._id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  {item.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  ₹ {item.price}
                </Typography>

                <Typography variant="body2" mt={1}>
                  {item.description}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() => handleDelete(item._id)}
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}