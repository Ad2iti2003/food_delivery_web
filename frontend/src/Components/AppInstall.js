import { Box, Typography, Button, Grid } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";

export default function AppInstall() {
  return (
    <Box px={{ xs: 3, md: 8 }} py={10} sx={{ backgroundColor: "#fafafa" }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" color="orange" fontWeight={600} mb={1}>
            MOBILE APP
          </Typography>
          <Typography variant="h4" fontWeight={800} mb={2}>
            Download Our App & Get Special Offers
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Order faster, track your delivery in real time, and get
            exclusive app-only deals. Available on iOS and Android.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<AppleIcon />}
              sx={{
                backgroundColor: "#1a1a1a", color: "white",
                borderRadius: 3, px: 3, py: 1.5,
                "&:hover": { backgroundColor: "#333" }
              }}
            >
              <Box>
                <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                  Download on the
                </Typography>
                <Typography fontWeight={700}>App Store</Typography>
              </Box>
            </Button>

            <Button
              variant="contained"
              startIcon={<AndroidIcon />}
              sx={{
                backgroundColor: "#1a1a1a", color: "white",
                borderRadius: 3, px: 3, py: 1.5,
                "&:hover": { backgroundColor: "#333" }
              }}
            >
              <Box>
                <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                  Get it on
                </Typography>
                <Typography fontWeight={700}>Google Play</Typography>
              </Box>
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{
            backgroundColor: "#FF8C00",
            borderRadius: 5, p: 6, textAlign: "center"
          }}>
            <Typography sx={{ fontSize: "6rem" }}>📱</Typography>
            <Typography variant="h6" color="white" fontWeight={700}>
              foodwagon app
            </Typography>
            <Typography color="rgba(255,255,255,0.8)">
              Coming Soon!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

