import { useState } from "react";
import logo from "../../assets/images/elecctroAHORRO.png";
import { FaBolt } from "react-icons/fa";   
import { TbMenu2, TbX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../common/LinkButton";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGoToCalculator = () => navigate("/calculator");
  const handleGoToHome = () => navigate("/home");
  const handleGoToProducts = () => navigate("/appliance/catalog");
  const handleGoToProfile = () => navigate("/user/profile");
  const handleGoToSave = () => navigate("/energytips");

  return (
    <>
      {/* NAVBAR */}
      <header
        className="
        fixed top-0 left-0 right-0 z-50 
        bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950
        backdrop-blur-xl
        border-b border-lime-400/30
        shadow-[0_0_18px_rgba(0,255,150,0.08)]
      "
      >
        <nav
          className="
          max-w-[1500px] mx-auto px-10 
          h-[16vh]
          flex justify-between items-center
        "
        >
          {/* LOGO */}
          <img
            src={logo}
            alt="logo"
            className="
              w-44 cursor-pointer 
              drop-shadow-[0_0_10px_rgba(0,255,100,0.15)]
              hover:scale-110
              hover:drop-shadow-[0_0_15px_rgba(0,255,120,0.3)]
              transition-all duration-300
            "
          />

          {/* MENU DESKTOP */}
          <ul
            className="
            hidden md:flex items-center gap-x-14
            text-[21px] font-bold tracking-wide
          "
          >
            <LinkButton 
              onNavigate={handleGoToHome} 
              location={"Inicio"} 
              className="text-white hover:text-lime-300 transition-all hover:drop-shadow-[0_0_6px_lime]" 
            />
            <LinkButton 
              onNavigate={handleGoToProducts} 
              location={"Productos"} 
              className="text-white hover:text-lime-300 transition-all hover:drop-shadow-[0_0_6px_lime]" 
            />
            <LinkButton 
              onNavigate={handleGoToSave} 
              location={"Ahorro"} 
              className="text-white hover:text-lime-300 transition-all hover:drop-shadow-[0_0_6px_lime]" 
            />
            <LinkButton 
              onNavigate={handleGoToCalculator} 
              location={"Calculadora"} 
              className="text-white hover:text-lime-300 transition-all hover:drop-shadow-[0_0_6px_lime]" 
            />
            <LinkButton 
              onNavigate={handleGoToProfile} 
              location={"Perfil"} 
              className="text-white hover:text-lime-300 transition-all hover:drop-shadow-[0_0_6px_lime]" 
            />
          </ul>

          {/* ACTIONS */}
          <div className="flex items-center gap-x-6">

            {/* ICONO FaBolt – NEÓN SUAVE */}
            <button
              className="
              text-white text-4xl 
              hover:text-lime-300 
              transition-all 
              hover:scale-115
              hover:drop-shadow-[0_0_6px_lime]
            "
            >
              <FaBolt />
            </button>

            {/* MENÚ MOBILE */}
            <button
              className="
              text-white text-5xl md:hidden 
              hover:text-lime-300 
              transition-all
              hover:scale-115
              hover:drop-shadow-[0_0_6px_lime]
            "
              onClick={() => setMenuOpen(true)}
            >
              <TbMenu2 />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};
