import React from "react";
import { Typography, Button } from "@mui/material";

function Payments() {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Saved Payment Methods
      </Typography>
      <Typography sx={{ color: "#777", mb: 2 }}>
        You have no saved payment methods.
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#ff9800", textTransform: "none" }}
      >
        Add Payment Method
      </Button>
    </>
  );
}

export default Payments;