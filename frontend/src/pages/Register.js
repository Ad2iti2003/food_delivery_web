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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // 👈 NEW
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role 
        }
      );

      alert("Account created successfully!");
      console.log(res.data);

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
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
      <Paper elevation={6} sx={{ padding: 4, width: 380, borderRadius: 3 }}>
        <Typography variant="h4" align="center" fontWeight="bold">
          Create Account
        </Typography>

        <Typography align="center" color="text.secondary" mb={3}>
          Join FoodWagon 🍔
        </Typography>

        <form onSubmit={handleRegister}>

          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              )
            }}
            required
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />

          {/*  ROLE DROPDOWN */}
          <TextField
            select
            fullWidth
            label="Register As"
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="restaurant">Restaurant</MenuItem>
       
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#ff9800",
              ":hover": { backgroundColor: "#fb8c00" }
            }}
          >
            Register
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
