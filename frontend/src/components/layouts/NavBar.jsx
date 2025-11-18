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

          {/* INPUT MODERNO (más compacto) */}
          <div className="
            hidden md:flex items-center 
            bg-white/10 backdrop-blur-xl 
            border border-lime-400/40 
            rounded-full px-4 py-1.5 
            shadow-inner hover:border-lime-300 
            transition
          ">
            <input
              type="text"
              placeholder="Buscar..."
              className="
                bg-transparent 
                text-white 
                placeholder-white/70 
                focus:outline-none 
                px-2 h-[5.5vh] 
                w-40 
                text-base
              "
            />
            <button className="
              bg-gradient-to-br from-lime-400 to-blue-900 
              text-white 
              w-11 h-11 
              flex justify-center items-center 
              rounded-full text-lg 
              shadow-md 
              hover:scale-110 
              hover:from-lime-500 hover:to-blue-950 
              transition-all duration-300
            ">
              <FaMagnifyingGlass />
            </button>
          </div>

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
