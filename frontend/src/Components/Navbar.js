import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight="bold" color="orange">
          foodwagon
        </Typography>

        <Box>
          <Button component={Link} to="/">
           Search Food
          </Button>

          {isLoggedIn ? (
            <>
              <IconButton onClick={() => navigate("/Profile")}>
                <AccountCircleIcon sx={{ fontSize: 32, color: "orange" }} />
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

