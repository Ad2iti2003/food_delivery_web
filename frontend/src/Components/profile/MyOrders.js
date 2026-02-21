import React from "react";
import { Typography } from "@mui/material";

function MyOrders() {
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        No Orders Yet
      </Typography>
      <Typography sx={{ color: "#777" }}>
        Looks like you haven't placed any orders.
      </Typography>
    </>
  );
}

export default MyOrders;
