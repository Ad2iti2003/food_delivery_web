import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const cats = [
  { name: "Pizza",    img: "https://img.icons8.com/color/96/pizza.png",        color: "#FFF3E0" },
  { name: "Burger",   img: "https://img.icons8.com/color/96/hamburger.png",    color: "#FCE4EC" },
  { name: "Noodles",  img: "https://img.icons8.com/color/96/noodles.png",      color: "#E8F5E9" },
  { name: "Sandwich", img: "https://img.icons8.com/color/96/sandwich.png",     color: "#E3F2FD" },
  { name: "Chowmein", img: "https://img.icons8.com/color/96/ramen.png",        color: "#F3E5F5" },
  { name: "Dessert",  img: "https://img.icons8.com/color/96/ice-cream-cone.png", color: "#E0F7FA" },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <Box px={{ xs: 3, md: 8 }} py={8}>
      <Typography variant="h6" color="orange" fontWeight={600} mb={1}>
        BROWSE MENU
      </Typography>
      <Typography variant="h4" fontWeight={700} mb={5}>
        Search by Category
      </Typography>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {cats.map((c, i) => (
          <Paper
            key={i}
            onClick={() => navigate("/menu")}
            elevation={0}
            sx={{
              p: 3, textAlign: "center",
              backgroundColor: c.color,
              borderRadius: 4, cursor: "pointer",
              minWidth: 120,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
              }
            }}
          >
            <Box
              component="img"
              src={c.img}
              alt={c.name}
              sx={{ width: 64, height: 64, mb: 1 }}
            />
            <Typography fontWeight={600} fontSize="0.9rem">{c.name}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}