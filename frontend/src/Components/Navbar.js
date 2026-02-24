import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

useEffect(() => {
  const handleStorageChange = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  handleStorageChange();
  window.addEventListener("storage", handleStorageChange);

  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="orange"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          foodwagon
        </Typography>

        <Box>
          <Button component={Link} to="/">
            Search Food
          </Button>

     
          {user?.role === "admin" && (
            <Button onClick={() => navigate("/admin")}>
              Admin Dashboard
            </Button>
          )}

          {user?.role === "restaurant" && (
            <Button onClick={() => navigate("/restaurant")}>
              Restaurant Panel
            </Button>
          )}

   
          {user ? (
            <>
              <IconButton onClick={() => navigate("/profile")}>
                <AccountCircleIcon
                  sx={{ fontSize: 32, color: "orange" }}
                />
              </IconButton>

              <Button onClick={handleLogout} color="error">
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="warning"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}