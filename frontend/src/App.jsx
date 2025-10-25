import "./App.css";
import { Home } from "./pages/Home.jsx";
import { Hero } from "./components/layouts/Hero.jsx";

export const App = () => {
  return (
    <div>
      <Home />
      <Hero />
    </div>
  );
};
