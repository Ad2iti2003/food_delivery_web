import React, { useState } from "react";

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
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";


function Profile() {
 const menuItems = [
  { text: "My Addresses", key: "addresses", icon: <LocationOnOutlinedIcon /> },
  { text: "My Orders", key: "orders", icon: <ShoppingBagOutlinedIcon /> },
  { text: "Payments", key: "payments", icon: <PaymentOutlinedIcon /> },
  { text: "Account Privacy", key: "account", icon: <LockOutlinedIcon /> },
  { text: "Logout", key: "logout", icon: <LogoutOutlinedIcon /> }
];


   const user = JSON.parse(localStorage.getItem("user"));
   const userName = user?.name || "Guest User";
   const [selectedSection, setSelectedSection] = useState("addresses");


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
                      onClick={() => setSelectedSection(item.key)}
                      sx={{
                        py: 1.6,
                        px: 2,
                        backgroundColor:
                          selectedSection === item.key ? "#eeeeee" : "transparent",
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
    p: 4
  }}
>
  {selectedSection === "addresses" && (
    <Box textAlign="center">
      <Typography variant="h6" fontWeight="600" gutterBottom>
        You have no saved addresses
      </Typography>

      <Typography sx={{ color: "#777", mb: 3, fontSize: 14 }}>
        Tell us where you want your orders delivered
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#ff9800",
          textTransform: "none"
        }}
      >
        Add New Address
      </Button>
    </Box>
  )}

  {selectedSection === "orders" && (
    <Box textAlign="center">
      <Typography variant="h6" fontWeight="600">
        No Orders Yet
      </Typography>
      <Typography sx={{ color: "#777", mt: 1 }}>
        Looks like you haven’t placed any orders.
      </Typography>
    </Box>
  )}

  {selectedSection === "payments" && (
    <Box textAlign="center">
      <Typography variant="h6" fontWeight="600">
        Saved Payment Methods
      </Typography>
      <Typography sx={{ color: "#777", mt: 1 }}>
        You have no saved payment methods.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "#ff9800",
          textTransform: "none"
        }}
      >
        Add Payment Method
      </Button>
    </Box>
  )}

  {selectedSection === "account" && (
    <Box>
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Account Details
      </Typography>

      <Typography fontSize={14}>
        <strong>Name:</strong> {userName}
      </Typography>

      <Typography fontSize={14}>
        <strong>Email:</strong> {user?.email}
      </Typography>
    </Box>
  )}
</Box>

      </Paper>
    </Box>
  );
}

export default Profile;

