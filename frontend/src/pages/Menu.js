import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button
} from "@mui/material";

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenu(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        All Menu Items
      </Typography>

      <Grid container spacing={3}>
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">
                  ₹{item.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#ff9800" }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}