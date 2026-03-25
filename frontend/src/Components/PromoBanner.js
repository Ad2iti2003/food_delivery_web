import { Box, Typography, Button, Chip } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function PromoBanner() {
  return (
    <Box px={{ xs: 3, md: 8 }} py={4}>
      <Box sx={{
        background: "linear-gradient(135deg, #FF8C00, #FF6B00)",
        borderRadius: 5, p: { xs: 4, md: 6 },
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap", gap: 4,
        position: "relative", overflow: "hidden"
      }}>
        {/* Background decoration */}
        <Box sx={{
          position: "absolute", right: -40, top: -40,
          width: 200, height: 200, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)"
        }} />
        <Box sx={{
          position: "absolute", right: 100, bottom: -60,
          width: 150, height: 150, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)"
        }} />

        <Box sx={{ zIndex: 1 }}>
          <Chip
            icon={<LocalOfferIcon sx={{ color: "orange !important" }} />}
            label="Limited Time Offer"
            sx={{ backgroundColor: "white", color: "orange", mb: 2, fontWeight: 600 }}
          />
          <Typography variant="h4" color="white" fontWeight={800} mb={1}>
            Get 30% OFF
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.9)" mb={3}>
            On your first order above ₹299
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white", color: "#FF8C00",
              fontWeight: 700, borderRadius: 3,
              "&:hover": { backgroundColor: "#fff3e0" }
            }}
          >
            Order Now
          </Button>
        </Box>

        <Box sx={{ zIndex: 1, fontSize: "8rem", lineHeight: 1 }}>
          🍔
        </Box>
      </Box>
    </Box>
  );
}


