import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
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
          {selectedSection === "orders" && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                No Orders Yet
              </Typography>
              <Typography sx={{ color: "#777", mt: 1 }}>
                Looks like you haven't placed any orders.
              </Typography>
            </>
          )}

          {selectedSection === "payments" && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
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
            </>
          )}

          {selectedSection === "addresses" && (
            <>
              <Typography variant="h6" sx={{ mb: 3 }}>
                My Addresses
              </Typography>

              {/* Add New Address */}
              <Box sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
                <Typography sx={{ mb: 2, fontWeight: 500 }}>Add New Address</Typography>
                <TextField
                  fullWidth
                  label="Full Address"
                  value={newAddress}
                  onChange={handleNewAddressChange}
                  sx={{ mb: 2 }}
                  multiline
                  rows={2}
                />
                <Button
                  variant="contained"
                  onClick={addNewAddress}
                  sx={{
                    backgroundColor: "#ff9800",
                    textTransform: "none",
                    mr: 1
                  }}
                >
                  Add Address
                </Button>
                {isEditingAddress && (
                  <Button
                    variant="outlined"
                    onClick={handleSaveAddresses}
                    sx={{ textTransform: "none" }}
                  >
                    Save All Changes
                  </Button>
                )}
              </Box>

              {/* Address List */}
              {addresses.length === 0 ? (
                <Typography sx={{ color: "#777" }}>
                  No addresses added yet.
                </Typography>
              ) : (
                addresses.map((address, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, position: "relative" }}>
                    {isEditingAddress ? (
                      <>
                        <TextField
                          fullWidth
                          label="Full Address"
                          value={address.fullAddress || ""}
                          onChange={(e) => handleAddressChange(index, "fullAddress", e.target.value)}
                          sx={{ mb: 2 }}
                          multiline
                          rows={2}
                        />
                        <TextField
                          fullWidth
                          label="City"
                          value={address.city || ""}
                          onChange={(e) => handleAddressChange(index, "city", e.target.value)}
                          sx={{ mb: 1 }}
                        />
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <TextField
                            label="State"
                            value={address.state || ""}
                            onChange={(e) => handleAddressChange(index, "state", e.target.value)}
                            sx={{ flex: 1, mb: 1 }}
                          />
                          <TextField
                            label="Pincode"
                            value={address.pincode || ""}
                            onChange={(e) => handleAddressChange(index, "pincode", e.target.value)}
                            sx={{ width: 120, mb: 1 }}
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography sx={{ mb: 1, fontWeight: 500 }}>
                          {address.fullAddress}
                        </Typography>
                        {address.city && (
                          <Typography sx={{ color: "#666", mb: 0.5 }}>
                            {address.city}, {address.state} {address.pincode}
                          </Typography>
                        )}
                        {address.isPrimary && (
                          <Typography sx={{ color: "#4caf50", fontSize: "0.875rem" }}>
                            Primary Address
                          </Typography>
                        )}
                      </>
                    )}

                    <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => setPrimaryAddress(index)}
                        color={address.isPrimary ? "primary" : "default"}
                      >
                        ★
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingAddressIndex(index);
                          setIsEditingAddress(true);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteAddress(index)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                ))
              )}

              <Button
                variant="outlined"
                onClick={() => setIsEditingAddress(!isEditingAddress)}
                sx={{ textTransform: "none" }}
                startIcon={isEditingAddress ? <EditIcon /> : undefined}
              >
                {isEditingAddress ? "Cancel Edit" : "Edit Addresses"}
              </Button>
            </>
          )}

          {selectedSection === "account" && (
            <>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Account Details
              </Typography>
              {isEditingAccount ? (
                <>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={accountData.name}
                    onChange={handleAccountChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={accountData.email}
                    onChange={handleAccountChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={accountData.phone}
                    onChange={handleAccountChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Address"
                    name="address"
                    value={accountData.address}
                    onChange={handleAccountChange}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSaveAccount}
                    sx={{
                      backgroundColor: "#ff9800",
                      textTransform: "none",
                      mr: 1
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditingAccount(false)}
                    sx={{ textTransform: "none" }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Name:</strong> {accountData.name}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Email:</strong> {accountData.email}
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Phone:</strong> {accountData.phone || "Not added"}
                  </Typography>
                  <Typography sx={{ mb: 3 }}>
                    <strong>Address:</strong> {accountData.address || "Not added"}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditingAccount(true)}
                    sx={{ textTransform: "none" }}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Profile;

