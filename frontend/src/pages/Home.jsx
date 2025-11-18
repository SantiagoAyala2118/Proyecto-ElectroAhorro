import { Navbar } from "../components/layouts/NavBar";
import { Hero } from "../components/layouts/Hero";
import { Category } from "../components/layouts/Category";
import { Products } from "../components/layouts/Products";
import "../styles/pages/Home.css"
export const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <Category />
    </div>
  );
};
