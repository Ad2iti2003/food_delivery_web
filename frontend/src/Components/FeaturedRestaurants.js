import Slider from "react-slick";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const restaurants = [
  { name: "Foodworld", img: "https://source.unsplash.com/400x300?food" },
  { name: "Pizza Hub", img: "https://source.unsplash.com/400x300?pizza" },
  { name: "Donuts Hut", img: "https://source.unsplash.com/400x300?donut" },
];

export default function FeaturedRestaurants() {

  const settings = {
    slidesToShow: 3,
    autoplay: true,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <>
      <h2 style={{ marginLeft: "40px" }}>Featured Restaurants</h2>

      <Slider {...settings}>
        {restaurants.map((r, i) => (
          <Card key={i} sx={{ mx: 1 }}>
            <CardMedia image={r.img} sx={{ height: 180 }} />
            <CardContent>
              <Typography fontWeight="bold">{r.name}</Typography>
              <Typography color="green">Open Now</Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </>
  );
}


