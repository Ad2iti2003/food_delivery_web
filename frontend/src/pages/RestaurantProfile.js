import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from "@mui/material";

export default function RestaurantProfile() {
  const [profile, setProfile] = useState({
    name: "My Restaurant",
    email: "restaurant@email.com",
    phone: "9876543210",
    address: "123 Main Street, City"
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Later connect to backend API
    console.log("Updated Profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        👤 Restaurant Profile
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Restaurant Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={3}
              value={profile.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}