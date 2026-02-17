import { Box, Typography, TextField, Button } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg,#FFC107,#FF9800)",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        px: 10,
      }}
    >
      <Box>
        <Typography variant="h2" color="white" fontWeight="bold">
          Are you starving?
        </Typography>

        <Typography color="white" mb={3}>
          Find meals near you in few clicks
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            placeholder="Search"
            sx={{ background: "white", borderRadius: 1 }}
          />
          <Button variant="contained" color="warning">
            Find Food
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

