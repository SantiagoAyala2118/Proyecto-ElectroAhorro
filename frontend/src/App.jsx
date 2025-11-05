import "./App.css";
import { Home } from "./pages/Home.jsx";
import { Hero } from "./components/layouts/Hero.jsx";
import { AppRouter } from "./routes/AppRouter.jsx";

export const App = () => {
  return (
    <div className="min-w-full">
      <AppRouter />
    </div>
  );
};
