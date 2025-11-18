import logo from "../../assets/images/elecctroAHORRO.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";
import { TbMenu2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../common/LinkButton";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleGoToCalculator = () => navigate("/calculator");
  const handleGoToHome = () => navigate("/home");
  const handleGoToProducts = () => navigate("/appliance/catalog");
  const handleGoToProfile = () => navigate("/user/profile");
  const handleGoToSave = () => navigate("/energytips");

  return (
    <header className="
      fixed top-0 left-0 right-0 z-50 
      bg-blue-950/90 backdrop-blur-md 
      border-b border-lime-400/40 
      shadow-lg
    ">
      <nav className="
        max-w-[1400px] mx-auto px-10 
        h-[16vh] 
        flex justify-between items-center
      ">

        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="
            w-40 
            cursor-pointer 
            drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]
            hover:scale-105 
            transition-transform duration-300
          "
        />

        {/* MENÚ DESKTOP */}
        <ul className="
          hidden md:flex items-center gap-x-10
          text-[17px] font-semibold tracking-wide
        ">
          <LinkButton
            onNavigate={handleGoToHome}
            location={"Inicio"}
            className="text-white hover:text-lime-400 transition"
          />
          <LinkButton
            onNavigate={handleGoToProducts}
            location={"Productos"}
            className="text-white hover:text-lime-400 transition"
          />
          <LinkButton
            onNavigate={handleGoToSave}
            location={"Ahorro"}
            className="text-white hover:text-lime-400 transition"
          />
          <LinkButton
            onNavigate={handleGoToCalculator}
            location={"Calculadora"}
            className="text-white hover:text-lime-400 transition"
          />
          <LinkButton
            onNavigate={handleGoToProfile}
            location={"Perfil"}
            className="text-white hover:text-lime-400 transition"
          />
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-x-6">

          {/* ICONO LUZ */}
          <button className="
            text-white text-2xl 
            hover:text-lime-400 
            transition 
            drop-shadow 
            hover:scale-110
          ">
            <MdOutlineLightMode />
          </button>

          {/* MENÚ MOBILE */}
          <button className="
            text-white text-3xl md:hidden 
            hover:text-lime-400 
            transition 
            drop-shadow 
            hover:scale-110
          ">
            <TbMenu2 />
          </button>
        </div>

      </nav>
    </header>
  );
};
