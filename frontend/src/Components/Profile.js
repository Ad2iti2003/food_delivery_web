import React, { useState, useEffect } from "react";


import {
  Box,
  Paper,
  Typography,

  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,

} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import MyAddresses from "./profile/MyAddresses";
import MyOrders from "./profile/MyOrders";
import Payments from "./profile/Payments";
import AccountDetails from "./profile/AccountDetails";

function Profile() {
  const menuItems = [
    { text: "My Addresses", key: "addresses", icon: <LocationOnOutlinedIcon /> },
    { text: "My Orders", key: "orders", icon: <ShoppingBagOutlinedIcon /> },
    { text: "Payments", key: "payments", icon: <PaymentOutlinedIcon /> },
    { text: "Account", key: "account", icon: <LockOutlinedIcon /> },
    { text: "Logout", key: "logout", icon: <LogoutOutlinedIcon /> }
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "Guest User";
  const [selectedSection, setSelectedSection] = useState("addresses");
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [newAddress, setNewAddress] = useState("");

  const [accountData, setAccountData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });

  const [addresses, setAddresses] = useState(user?.addresses || []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setAccountData({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        address: storedUser.address || ""
      });
      setAddresses(storedUser.addresses || []);
    }
  }, []);

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({
      ...prev,
      [name]: value
    }));
  };



  const handleNewAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleAddressChange = (index, field, value) => {
    setAddresses((prev) => {
      const newAddresses = [...prev];
      newAddresses[index] = { ...newAddresses[index], [field]: value };
      return newAddresses;
    });
  };

  const handleSaveAccount = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:5000/api/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(accountData)
        }
      );
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      setAccountData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || ""
      });
      setIsEditingAccount(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveAddresses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:5000/api/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ addresses })
        }
      );
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      setAddresses(data.addresses || []);
      setIsEditingAddress(false);
      alert("Addresses updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const addNewAddress = async () => {
    if (!newAddress.trim()) return;
    
    const addressObj = {
      fullAddress: newAddress,
      city: "",
      state: "",
      pincode: "",
      isPrimary: addresses.length === 0
    };
    
    const updatedAddresses = [...addresses, addressObj];
    setAddresses(updatedAddresses);
    setNewAddress("");
    
    // Save to backend
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await fetch(
        `http://localhost:5000/api/user/update/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addresses: updatedAddresses })
        }
      );
      const res = await fetch(`http://localhost:5000/api/user/${user._id}`);
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    
    // Update backend
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(
      `http://localhost:5000/api/user/update/${user._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: updatedAddresses })
      }
    );
  };

  const setPrimaryAddress = (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      isPrimary: i === index
    }));
    setAddresses(updatedAddresses);
    
    // Update backend
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(
      `http://localhost:5000/api/user/update/${user._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: updatedAddresses })
      }
    );
  };

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
          {/* User Info */}
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
              {userName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
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
        <Box sx={{ flex: 1, p: 4 }}>
  {selectedSection === "addresses" && (
    <MyAddresses
      addresses={addresses}
      newAddress={newAddress}
      setNewAddress={setNewAddress}
      addNewAddress={addNewAddress}
      deleteAddress={deleteAddress}
      isEditingAddress={isEditingAddress}
      setIsEditingAddress={setIsEditingAddress}
      handleAddressChange={handleAddressChange}
      handleSaveAddresses={handleSaveAddresses}
      setPrimaryAddress={setPrimaryAddress}
    />
  )}

  {selectedSection === "orders" && <MyOrders />}

  {selectedSection === "payments" && <Payments />}

  {selectedSection === "account" && (
    <AccountDetails
      accountData={accountData}
      isEditingAccount={isEditingAccount}
      setIsEditingAccount={setIsEditingAccount}
      handleAccountChange={handleAccountChange}
      handleSaveAccount={handleSaveAccount}
    />
  )}
</Box>
      </Paper>
    </Box>
  );
}

export default Profile;

