import {
  AppBar, Toolbar, Typography, Button,
  Box, IconButton, Badge
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext"; // ✅ add

export default function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart(); // ✅ get cart count
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
      } catch {
        setUser(null);
      }
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("userUpdated", loadUser);
    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/login");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h5" fontWeight="bold" color="orange"
          sx={{ cursor: "pointer" }} onClick={() => navigate("/")}
        >
          foodwagon
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button component={Link} to="/">Search Food</Button>

          {user?.role === "admin" && (
            <Button onClick={() => navigate("/admin")}>Admin Dashboard</Button>
          )}
          {user?.role === "restaurant" && (
            <Button onClick={() => navigate("/restaurant")}>Restaurant Panel</Button>
          )}

          {/* ✅ Cart icon with badge */}
          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={totalItems} color="warning">
              <ShoppingCartIcon sx={{ fontSize: 28, color: "orange" }} />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <IconButton onClick={() => navigate("/profile")}>
                <AccountCircleIcon sx={{ fontSize: 32, color: "orange" }} />
              </IconButton>
              <Button onClick={handleLogout} color="error">Logout</Button>
            </>
          ) : (
            <Button variant="contained" color="warning" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}