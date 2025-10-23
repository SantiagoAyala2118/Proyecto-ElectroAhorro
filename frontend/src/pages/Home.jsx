import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Category from "../Category/Category";
import Products from "../Products/Products";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Category />
      <Products />
    </div>
  );
};
