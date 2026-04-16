import React, { useState, useEffect } from "react";
import {
  Box, Paper, Typography, List, ListItemButton,
  ListItemIcon, ListItemText, Divider
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import Myaddress from "./profile/MyAddresses";
import MyOrders from "./profile/MyOrders";
import Payments from "./profile/Payments";
import AccountDetails from "./profile/AccountDetails";

function Profile() {
  const [userName, setUserName] = useState("Guest User");
  const [userEmail, setUserEmail] = useState("");
  const menuItems = [
    { text: "My address", key: "address", icon: <LocationOnOutlinedIcon /> },
    { text: "My Orders",    key: "orders",    icon: <ShoppingBagOutlinedIcon /> },
    { text: "Payments",     key: "payments",  icon: <PaymentOutlinedIcon /> },
    { text: "Account",      key: "account",   icon: <LockOutlinedIcon /> },
    { text: "Logout",       key: "logout",    icon: <LogoutOutlinedIcon /> }
  ];

  const [selectedSection,   setSelectedSection]   = useState("address");
  const [isEditingAccount,  setIsEditingAccount]  = useState(false);
  const [isEditingAddress,  setIsEditingAddress]  = useState(false);
  const [newAddress,        setNewAddress]        = useState("");
  const [address,         setaddress]         = useState([]);
  const [accountData,       setAccountData]       = useState({
    name: "", email: "", phone: "", address: ""
  });


  // ✅ Load user from localStorage once on mount
 // Fetch latest user profile from MongoDB
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser) {
    setUserName(storedUser.name);
    setUserEmail(storedUser.email);

    setAccountData({
      name: storedUser.name || "",
      email: storedUser.email || "",
      phone: storedUser.phone || "",
      address: storedUser.address || ""
    });

    setaddress(Array.isArray(storedUser.address) ? storedUser.address : []);
  }
}, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    window.location.href = "/login";
  };

  // ✅ Menu click handler
  const handleMenuClick = (key) => {
    if (key === "logout") {
      handleLogout();
    } else {
      setSelectedSection(key);
    }
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (index, field, value) => {
    setaddress((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSaveAccount = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:5000/api/user/update/${storedUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(accountData)
        }
      );
      const data = await res.json();

      // ✅ merge with existing localStorage user
      const updatedUser = { ...storedUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ✅ update state with new data
      setUserName(data.name   || "Guest User");
      setUserEmail(data.email || "");
      setAccountData({
        name:    data.name    || "",
        email:   data.email   || "",
        phone:   data.phone   || "",
        address: data.address || ""
      });
      setIsEditingAccount(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  const handleSaveaddress = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:5000/api/user/update/${storedUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address })
        }
      );
      const data = await res.json();
      const updatedUser = { ...storedUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setaddress(data.address || []);
      setIsEditingAddress(false);
      alert("address updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const addNewAddress = async () => {
    if (!newAddress.trim()) return;
    const addressObj = {
      fullAddress: newAddress,
      isPrimary:   address.length === 0
    };
    const updatedaddress = [...address, addressObj];
    setaddress(updatedaddress);
    setNewAddress("");
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:5000/api/user/update/${storedUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: updatedaddress })
        }
      );
      const data = await res.json();
      const updatedUser = { ...storedUser, ...data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAddress = (index) => {
    const updated = address.filter((_, i) => i !== index);
    setaddress(updated);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:5000/api/user/update/${storedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: updated })
    });
  };

  const setPrimaryAddress = (index) => {
    const updated = address.map((addr, i) => ({
      ...addr, isPrimary: i === index
    }));
    setaddress(updated);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:5000/api/user/update/${storedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: updated })
    });
  };

  return (
    <Box sx={{
      minHeight: "100vh", backgroundColor: "#f5f5f5",
      display: "flex", justifyContent: "center",
      alignItems: "center", p: 3
    }}>
      <Paper elevation={2} sx={{
        width: "100%", maxWidth: 1000,
        display: "flex", minHeight: 520, borderRadius: 2
      }}>
        {/* Sidebar */}
        <Box sx={{
          width: 260, borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa"
        }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            {/* ✅ using state variables, no duplicate */}
            <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600 }}>
              {userName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {userEmail}
            </Typography>
          </Box>

          <List disablePadding>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItemButton
                  onClick={() => handleMenuClick(item.key)}
                  sx={{
                    py: 1.6, px: 2,
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
                    primaryTypographyProps={{ fontSize: 15, color: "#444" }}
                  />
                </ListItemButton>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Right Panel */}
        <Box sx={{ flex: 1, p: 4 }}>
          {selectedSection === "address" && (
            <Myaddress
              address={address}
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              addNewAddress={addNewAddress}
              deleteAddress={deleteAddress}
              isEditingAddress={isEditingAddress}
              setIsEditingAddress={setIsEditingAddress}
              handleAddressChange={handleAddressChange}
              handleSaveaddress={handleSaveaddress}
              setPrimaryAddress={setPrimaryAddress}
            />
          )}
          {selectedSection === "orders"   && <MyOrders />}
          {selectedSection === "payments" && <Payments />}
          {selectedSection === "account"  && (
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
