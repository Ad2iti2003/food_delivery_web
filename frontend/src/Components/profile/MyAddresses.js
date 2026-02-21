import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MyAddresses({
  addresses,
  newAddress,
  setNewAddress,
  addNewAddress,
  deleteAddress,
  isEditingAddress,
  setIsEditingAddress,
  handleAddressChange,
  handleSaveAddresses,
  setPrimaryAddress
}) {

  // ✅ State must be inside function body
  const [loadingLocation, setLoadingLocation] = useState(false);

  // ✅ Function must also be inside function body
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await res.json();

          if (data.display_name) {
            setNewAddress(data.display_name);
          }
        } catch (error) {
          console.error(error);
          alert("Unable to fetch address");
        }

        setLoadingLocation(false);
      },
      () => {
        alert("Location permission denied");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 3 }}>
        My Addresses
      </Typography>

      {/* Add Address */}
      <Box sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}>
        <Typography sx={{ mb: 2, fontWeight: 500 }}>
          Add New Address
        </Typography>

        <TextField
          fullWidth
          label="Full Address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />

        {/* ✅ Location Button */}
        <Button
          variant="outlined"
          onClick={getCurrentLocation}
          disabled={loadingLocation}
          sx={{ mr: 2, textTransform: "none" }}
        >
          {loadingLocation ? "Detecting..." : "Use Current Location"}
        </Button>

        <Button
          variant="contained"
          onClick={addNewAddress}
          sx={{ backgroundColor: "#ff9800", textTransform: "none" }}
        >
          Add Address
        </Button>

        {isEditingAddress && (
          <Button
            variant="outlined"
            onClick={handleSaveAddresses}
            sx={{ textTransform: "none", ml: 2 }}
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
              <TextField
                fullWidth
                label="Full Address"
                value={address.fullAddress || ""}
                onChange={(e) =>
                  handleAddressChange(index, "fullAddress", e.target.value)
                }
                multiline
                rows={2}
              />
            ) : (
              <>
                <Typography sx={{ fontWeight: 500 }}>
                  {address.fullAddress}
                </Typography>

                {address.isPrimary && (
                  <Typography sx={{ color: "#4caf50", fontSize: "0.875rem" }}>
                    Primary Address
                  </Typography>
                )}
              </>
            )}

            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                gap: 1
              }}
            >
              <IconButton
                size="small"
                onClick={() => setPrimaryAddress(index)}
              >
                ★
              </IconButton>

              <IconButton
                size="small"
                onClick={() => setIsEditingAddress(true)}
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
    </>
  );
}

export default MyAddresses;