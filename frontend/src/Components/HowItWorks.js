import { Grid, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PaymentsIcon from "@mui/icons-material/Payments";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const steps = [
  { icon: <LocationOnIcon />, title: "Select Location" },
  { icon: <RestaurantIcon />, title: "Choose Order" },
  { icon: <PaymentsIcon />, title: "Pay Advanced" },
  { icon: <EmojiEmotionsIcon />, title: "Enjoy Meals" },
];

export default function HowItWorks() {
  return (
    <Box py={6}>
      <Typography variant="h4" align="center" mb={4}>
        How does it work
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Box textAlign="center">
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "orange",
                  borderRadius: "50%",
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {s.icon}
              </Box>
              <Typography mt={2}>{s.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
