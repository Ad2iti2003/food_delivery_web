import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";


function Profile() {
  const menuItems = [
    { text: "My Addresses", icon: <LocationOnOutlinedIcon />, active: true },
    { text: "My Orders", icon: <ShoppingBagOutlinedIcon /> },
    { text: "My Prescriptions", icon: <DescriptionOutlinedIcon /> },
    { text: "E-Gift Cards", icon: <CardGiftcardOutlinedIcon /> },
    { text: "Account privacy", icon: <LockOutlinedIcon /> },
    { text: "Logout", icon: <LogoutOutlinedIcon /> }
  ];
   const user = JSON.parse(localStorage.getItem("user"));
   const userName = user?.name || "Guest User";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          minHeight: 520,
          borderRadius: 2
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: 260,
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fafafa"
          }}
        >
          {/* Phone number */}
          <Box
  sx={{
    p: 2,
    borderBottom: "1px solid #e0e0e0"
  }}
>
  <Typography fontWeight={600} fontSize={16}>
    {userName}
  </Typography>
  <Typography fontSize={13} color="#777">
    {user?.email}
  </Typography>
</Box>

          {/* Menu */}
          <List disablePadding>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItemButton
                  sx={{
                    py: 1.6,
                    px: 2,
                    backgroundColor: item.active ? "#eeeeee" : "transparent",
                    "&:hover": { backgroundColor: "#f0f0f0" }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "#666" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 15,
                      color: "#444"
                    }}
                  />
                </ListItemButton>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Right Panel */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            p: 4
          }}
        >
          {/* Illustration */}
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="No address"
            sx={{
              width: 160,
              mb: 3,
              opacity: 0.9
            }}
          />

          <Typography variant="h6" fontWeight="600" gutterBottom>
            You have no saved addresses
          </Typography>

          <Typography
            sx={{ color: "#777", mb: 3, fontSize: 14 }}
          >
            Tell us where you want your orders delivered
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff9800",
              px: 4,
              py: 1.2,
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#ff9800"
              }
            }}
          >
            Add New Address
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Profile;

