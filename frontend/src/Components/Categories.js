import { Box, Typography, Avatar } from "@mui/material";

const cats = ["Pizza", "Burger", "Noodles", "Sandwich", "Chowmein"];

export default function Categories() {
  return (
    <Box px={6} py={5}>
      <Typography variant="h4" mb={3}>
        Search by Food
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        {cats.map((c, i) => (
          <Box key={i} textAlign="center">
            <Avatar
              src={`https://source.unsplash.com/200x200?${c}`}
              sx={{ width: 90, height: 90 }}
            />
            <Typography>{c}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
