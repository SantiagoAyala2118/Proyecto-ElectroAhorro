import { Navbar } from "../components/layouts/NavBar";
import { Hero } from "../components/layouts/Hero";
import { Category } from "../components/layouts/Category";
import { Products } from "../components/layouts/Products";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Category />
      <Products />
    </>
  );
};
