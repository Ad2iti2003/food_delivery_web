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

          <Button
            variant="contained"
            onClick={handleSaveAccount}
            sx={{ backgroundColor: "#ff9800", textTransform: "none", mr: 1 }}
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
          <Typography sx={{ mb: 3 }}>
            <strong>Email:</strong> {accountData.email}
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