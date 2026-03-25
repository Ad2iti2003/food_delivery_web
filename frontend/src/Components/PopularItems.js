import Slider from "react-slick";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../Context/CartContext";

export default function PopularItems() {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // ✅ fetch only once on mount
    axios.get("http://localhost:5000/api/menu")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []); // ✅ empty array — runs only once

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  // ✅ don't render slider if no items
  if (items.length === 0) {
    return (
      <>
        <h2 style={{ marginLeft: "40px" }}>Popular Items</h2>
        <p style={{ marginLeft: "40px", color: "#999" }}>
          No items available yet.
        </p>
      </>
    );
  }

  return (
    <>
      <h2 style={{ marginLeft: "40px" }}>Popular Items</h2>
      <Slider {...settings}>
        {items.map((item, i) => (
          <Card key={i} sx={{ mx: 1 }}>
            <CardMedia
              component="img"
              image={
                item.image
                  ? `http://localhost:5000${item.image}`
                  : "https://source.unsplash.com/400x300?food"
              }
              sx={{ height: 200, objectFit: "cover" }}
            />
            <CardContent>
              <Typography fontWeight="bold">{item.name}</Typography>
              <Typography color="orange">₹{item.price}</Typography>
              <Button
                fullWidth variant="contained" color="warning"
                sx={{ mt: 1 }}
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </>
  );
}
