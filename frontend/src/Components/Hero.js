import { Box, Typography, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Hero() {
  return (
    <Box sx={{
      background: "linear-gradient(135deg, #FF8C00 0%, #FFA500 50%, #FFD700 100%)",
      minHeight: "88vh",
      display: "flex",
      alignItems: "center",
      px: { xs: 3, md: 10 },
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background circles decoration */}
      <Box sx={{
        position: "absolute", top: -80, right: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "rgba(255,255,255,0.08)"
      }} />
      <Box sx={{
        position: "absolute", bottom: -100, right: 200,
        width: 300, height: 300, borderRadius: "50%",
        background: "rgba(255,255,255,0.06)"
      }} />
      <Box sx={{
        position: "absolute", top: 50, right: 300,
        width: 150, height: 150, borderRadius: "50%",
        background: "rgba(255,255,255,0.05)"
      }} />

      <Box sx={{ maxWidth: 600, zIndex: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: "rgba(255,255,255,0.9)", mb: 1, fontWeight: 500 }}
        >
          🚀 Fast Delivery to Your Door
        </Typography>

        <Typography
          variant="h2"
          sx={{
            color: "white", fontWeight: 800,
            lineHeight: 1.2, mb: 2,
            fontSize: { xs: "2.5rem", md: "3.5rem" }
          }}
        >
          Are you <span style={{ color: "#fff3" }}>Starving</span>?
        </Typography>

        <Typography
          sx={{ color: "rgba(255,255,255,0.85)", mb: 4, fontSize: "1.1rem" }}
        >
          Find the best restaurants and dishes near you. Order now and get
          delivery in under 30 minutes!
        </Typography>

        {/* Search Bar */}
        <Box sx={{
          display: "flex", gap: 0,
          backgroundColor: "white",
          borderRadius: 3, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          maxWidth: 520
        }}>
          <TextField
            placeholder="Enter your delivery location..."
            variant="standard"
            sx={{ flex: 1, px: 2, py: 1 }}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: "orange" }} />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF8C00",
              px: 3, borderRadius: 0,
              "&:hover": { backgroundColor: "#e67e00" }
            }}
          >
            <SearchIcon />
          </Button>
        </Box>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 4, mt: 4 }}>
          {[
            { value: "50+", label: "Restaurants" },
            { value: "200+", label: "Menu Items" },
            { value: "30min", label: "Avg Delivery" }
          ].map((stat, i) => (
            <Box key={i} textAlign="center">
              <Typography sx={{ color: "white", fontWeight: 800, fontSize: "1.5rem" }}>
                {stat.value}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem" }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

