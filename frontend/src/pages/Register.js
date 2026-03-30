import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  MenuItem
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "axios";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "user"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Register User
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);   // ✅ Debug

    const { name, email, phone, address, password, role } = formData;

    if (!name || !email || !password) {
      return alert("Please fill all required fields");
    }

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      return alert("Enter valid 10 digit phone number");
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          password,
          role
        }
      );

      console.log("Server Response:", response.data); // ✅ Debug

      alert("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: "user"
      });

      navigate("/login");

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #fff3e0, #ffe0b2)"
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: 420, borderRadius: 3 }}>

        <Typography variant="h4" align="center" fontWeight="bold">
          Create Account
        </Typography>

        <Typography align="center" color="text.secondary" mb={3}>
          Join FoodWagon 🍔
        </Typography>

        <form onSubmit={handleRegister} autoComplete="off">

          {/* Name */}
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }}
          />

          {/* Email */}
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />

          {/* Phone */}
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            inputProps={{ maxLength: 10 }}
            placeholder="10-digit mobile number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              )
            }}
          />

          {/* Address */}
          <TextField
            fullWidth
            label="Delivery Address"
            name="address"
            margin="normal"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={2}
            placeholder="House no, Street, City, State"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              )
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {/* Role */}
          <TextField
            select
            fullWidth
            label="Register As"
            name="role"
            margin="normal"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="restaurant">Restaurant Owner</MenuItem>
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              backgroundColor: "#ff9800",
              ":hover": { backgroundColor: "#fb8c00" }
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

        </form>

        <Typography align="center" mt={2}>
          Already have an account?{" "}
          <span
            style={{ color: "#ff9800", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>

      </Paper>
    </Box>
  );
}