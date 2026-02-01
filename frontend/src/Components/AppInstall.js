import { Box, Typography } from "@mui/material";

export default function AppInstall() {
  return (
    <Box px={6} py={8} textAlign="center">
      <Typography variant="h3" mb={2}>
        Install the app
      </Typography>
      <Typography>
        Get best discounts and order fast
      </Typography>

      <Box mt={3}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          width="150"
        />
        &nbsp;&nbsp;
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          width="150"
        />
      </Box>
    </Box>
  );
}

