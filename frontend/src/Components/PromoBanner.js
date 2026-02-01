import { Box, Typography, Button } from "@mui/material";

export default function PromoBanner() {
  return (
    <Box
      sx={{
        background: "#fff3e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 8,
        py: 5,
      }}
    >
      <Box>
        <Typography variant="h4">Best deals Crispy Sandwiches</Typography>
        <Button variant="contained" color="warning">
          Proceed to order
        </Button>
      </Box>

      <img
        src="https://source.unsplash.com/400x250?sandwich"
        width="350"
      />
    </Box>
  );
}

