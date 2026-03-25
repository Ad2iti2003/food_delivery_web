import { Box, Typography, Grid, Divider } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#1a1a1a", color: "white", pt: 8, pb: 4 }}>
      <Box px={{ xs: 3, md: 8 }}>
        <Grid container spacing={6} mb={6}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={800} color="orange" mb={2}>
              foodwagon 🍔
            </Typography>
            <Typography color="rgba(255,255,255,0.6)" mb={3} lineHeight={1.8}>
              Delivering happiness to your doorstep. Fast, fresh, and delicious
              food from the best restaurants near you.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight={700} mb={3}>Quick Links</Typography>
            {["Home", "Menu", "Login", "Register"].map((link) => (
              <Typography key={link} mb={1.5}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                >
                  {link}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Contact */}
          <Grid item xs={6} md={3}>
            <Typography fontWeight={700} mb={3}>Contact</Typography>
            {[
              { icon: "📍", text: "123 Food Street, Delhi" },
              { icon: "📞", text: "+91 98765 43210" },
              { icon: "✉️", text: "hello@foodwagon.com" },
              { icon: "⏰", text: "Mon-Sun: 9AM - 11PM" }
            ].map((item, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                <Typography>{item.icon}</Typography>
                <Typography color="rgba(255,255,255,0.6)" fontSize="0.9rem">
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography fontWeight={700} mb={3}>Follow Us</Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <Box key={i} sx={{
                  width: 40, height: 40, borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer",
                  fontSize: "1.2rem",
                  "&:hover": { backgroundColor: "orange" }
                }}>
                  {icon}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <Typography color="rgba(255,255,255,0.5)" fontSize="0.9rem">
            © 2026 FoodWagon. All Rights Reserved.
          </Typography>
          <Typography color="rgba(255,255,255,0.5)" fontSize="0.9rem">
            Made with ❤️ in India
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

