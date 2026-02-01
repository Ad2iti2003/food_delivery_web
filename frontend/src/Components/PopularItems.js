import Slider from "react-slick";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


export default function PopularItems() {

    const [items, setItems] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

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

  return (
    <>
      <h2 style={{ marginLeft: "40px" }}>Popular Items</h2>

      <Slider {...settings}>
        {items.map((item, i) => (
          <Card key={i} sx={{ mx: 1 }}>
            <CardMedia image={item.img} sx={{ height: 200 }} />
            <CardContent>
              <Typography>{item.name}</Typography>
              <Typography color="orange">{item.price}</Typography>
              <Button fullWidth variant="contained" color="warning">
                Order Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </>
  );
}

