// importamos la imagen del logo
import logo from "../../assets/images/elecctroAHORRO.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";
import { TbMenu2 } from "react-icons/tb";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleGoToCalculator = () => {
    navigate("/calculator");
  };

  return (
    <header className="bg-blue-950 text-white fixed top-0 right-0 left-0 z-50">
      <nav className="max-w-[1400px] max-auto px-10 h-[14vh] flex justify-between items-center bg-blue-950">
        {/* utilizamos el logo que importamos */}
        <img className="w-38" src={logo} alt="" />

        {/* DesktopMenu */}

        <ul className="md:flex items-center gap-x-15 hidden">
          <li>
            <a
              href="#"
              className="font-semibold tracking-wider text-lime-400 hover:text-white"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-semibold tracking-wider text-white hover:text-lime-400"
            >
              Productos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-semibold tracking-wider text-white hover:text-lime-400"
            >
              Ahorro
            </a>
          </li>
          <li >
            <a
              onClick={handleGoToCalculator}
              className="font-semibold tracking-wider text-white hover:text-lime-400 cursor-pointer"
            >
              Calculadora
            </a>
          </li>
          <li>
            <a
              href="#"
              className="font-semibold tracking-wider text-white hover:text-lime-400"
            >
              Perfil
            </a>
          </li>
        </ul>

        {/* nav action*/}
        <div className="flex items-center gap-x-5">
          {/*Input field*/}
          <div className="flex p-1 border-2 border-lime-400 rounded-full ">
            <input
              type="text"
              name="text"
              id="text"
              placeholder="Buscar..."
              autoComplete="off"
              className="flex-1 h-[5vh] px-3 focus:outline-none"
            />
            <button className="bg-gradient-to-b from-lime-800 to-lime-400 text-white w-10 h-10 flex justify-center items-center rounded-full text-xl">
              <FaMagnifyingGlass />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white text-2xl">
            <MdOutlineLightMode />
          </a>

          <a href="#" className="text-white text-3xl md:hidden">
            <TbMenu2 />
          </a>
        </div>
      </nav>
    </header>
  );
};
