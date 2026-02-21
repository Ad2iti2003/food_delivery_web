import React from "react";
import { Typography, TextField, Button } from "@mui/material";

function AccountDetails({
  accountData,
  isEditingAccount,
  setIsEditingAccount,
  handleAccountChange,
  handleSaveAccount
}) {
  return (
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

          {/* ✅ Phone Number */}
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={accountData.phone || ""}
            onChange={handleAccountChange}
            sx={{ mb: 2 }}
          />

          {/* ✅ Address */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Address"
            name="address"
            value={accountData.address || ""}
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

          {/* ✅ Show Phone */}
          <Typography sx={{ mb: 1 }}>
            <strong>Phone:</strong>{" "}
            {accountData.phone ? accountData.phone : "Not added"}
          </Typography>

          {/* ✅ Show Address */}
          <Typography sx={{ mb: 3 }}>
            <strong>Address:</strong>{" "}
            {accountData.address ? accountData.address : "Not added"}
          </Typography>

          <Button
            variant="outlined"
            onClick={() => setIsEditingAccount(true)}
          >
            Edit Profile
          </Button>
        </>
      )}
    </>
  );
}

export default AccountDetails;