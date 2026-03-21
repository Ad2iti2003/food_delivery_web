import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Typography, TextField, Button, Card, CardContent,
  CardMedia, Grid, IconButton, CircularProgress, Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState(null);      // ✅ image file
  const [imagePreview, setImagePreview] = useState(""); // ✅ preview URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => { fetchMenu(); }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(res.data);
    } catch {
      setError("Failed to load menu.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // show preview
    }
  };

  const handleAddItem = async () => {
    if (!form.name || !form.price) {
      setError("Name and Price are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // ✅ Use FormData to send image + text together
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.post("http://localhost:5000/api/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMenuItems([...menuItems, res.data]);
      setForm({ name: "", price: "", description: "" });
      setImageFile(null);
      setImagePreview("");
      setSuccess("Item added successfully!");
    } catch {
      setError("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
      setSuccess("Item deleted successfully!");
    } catch {
      setError("Failed to delete item.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>🍔 Manage Menu</Typography>

      {error   && <Alert severity="error"   sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Add Menu Form */}
      <Box sx={{ mb: 4, p: 3, border: "1px solid #ddd", borderRadius: 2, backgroundColor: "#fff" }}>
        <Typography variant="h6" mb={2}>Add New Item</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Item Name" name="name"
              value={form.name} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Price" name="price" type="number"
              value={form.price} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField fullWidth label="Description" name="description"
              value={form.description} onChange={handleChange} />
          </Grid>

          {/* ✅ Image Upload */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label"
              sx={{ textTransform: "none", mr: 2 }}>
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>

            {/* ✅ Image Preview */}
            {imagePreview && (
              <Box sx={{ mt: 2, display: "inline-block" }}>
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{
                    width: 120, height: 90,
                    objectFit: "cover", borderRadius: 8,
                    border: "1px solid #ddd"
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddItem}
              sx={{ backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#e68900" } }}>
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
              {/* ✅ Show image if exists */}
              {item.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">₹ {item.price}</Typography>
                <Typography variant="body2" mt={1}>{item.description}</Typography>
                <IconButton color="error" onClick={() => handleDelete(item._id)} sx={{ mt: 1 }}>
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