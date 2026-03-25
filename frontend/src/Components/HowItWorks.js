import { Grid, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PaymentsIcon from "@mui/icons-material/Payments";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const steps = [
  { icon: <LocationOnIcon sx={{ fontSize: 32 }} />, title: "Select Location", desc: "Enter your delivery address", color: "#FF8C00" },
  { icon: <RestaurantIcon sx={{ fontSize: 32 }} />, title: "Choose Order",    desc: "Browse menus and pick items", color: "#9C27B0" },
  { icon: <PaymentsIcon   sx={{ fontSize: 32 }} />, title: "Pay Securely",   desc: "Multiple payment options",    color: "#2196F3" },
  { icon: <EmojiEmotionsIcon sx={{ fontSize: 32 }} />, title: "Enjoy Meals", desc: "Get delivery at your door",  color: "#4CAF50" },
];

export default function HowItWorks() {
  return (
    <Box py={10} px={{ xs: 3, md: 8 }} sx={{ backgroundColor: "#fafafa" }}>
      <Typography variant="h6" align="center" color="orange" fontWeight={600} mb={1}>
        SIMPLE STEPS
      </Typography>
      <Typography variant="h4" align="center" fontWeight={700} mb={2}>
        How Does It Work?
      </Typography>
      <Typography align="center" color="text.secondary" mb={6}>
        Order your favourite food in just 4 easy steps
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box sx={{
              textAlign: "center", p: 3,
              backgroundColor: "white",
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-6px)" }
            }}>
              {/* Step number */}
              <Typography sx={{
                color: "#eee", fontWeight: 900,
                fontSize: "3rem", lineHeight: 1, mb: 1
              }}>
                {String(i + 1).padStart(2, "0")}
              </Typography>

              <Box sx={{
                width: 70, height: 70,
                backgroundColor: s.color + "15",
                borderRadius: "50%", mx: "auto", mb: 2,
                display: "flex", alignItems: "center",
                justifyContent: "center", color: s.color
              }}>
                {s.icon}
              </Box>

              <Typography fontWeight={700} mb={1}>{s.title}</Typography>
              <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}