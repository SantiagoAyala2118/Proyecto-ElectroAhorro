// Se importan los componentes a utilizar
import { createBrowserRouter } from "react-router-dom";
import { Registro } from "../pages/Registro.jsx";
import { Login } from "../pages/Login.jsx";
import { App } from "../App.jsx";
import { UserProfile } from "../pages/Perfil.jsx";
import Calculadora from "../pages/Calculadora.jsx";
import { CatalogoElectrodomesticos } from "../pages/Catalogo.jsx";

// Se hace una constante router en donde se guardan todas las direcciones para ir navegando por los componentes
export const router = createBrowserRouter([
  { path: "/", element: <Registro /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <App /> },
  { path: "/calculator", element: <Calculadora /> },
  { path: "/user/profile", element: <UserProfile /> },
  { path: "/catalogo", element: <CatalogoElectrodomesticos /> },
]);
