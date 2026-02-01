import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import PopularItems from "../Components/PopularItems";
import FeaturedRestaurants from "../Components/FeaturedRestaurants";
import Categories from "../Components/Categories";
import PromoBanner from "../Components/PromoBanner";
import AppInstall from "../Components/AppInstall";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PopularItems />
      <FeaturedRestaurants />
      <Categories />
      <PromoBanner />
      <AppInstall />
      <Footer />
    </>
  );
}
