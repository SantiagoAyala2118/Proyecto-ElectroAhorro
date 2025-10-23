// Se importan los componentes a utilizar
import { createBrowserRouter } from "react-router-dom";
import {} from "../pages/Registro.jsx";
import Login from "../components/Login/Login.jsx";
import Home from "../components/pages/Home.jsx";

// Se hace una constante router en donde se guardan todas las direcciones para ir navegando por los componentes
export const router = createBrowserRouter([
  { path: "/", element: <Registro /> },
  { path: "/login", element: <Login /> },
  { path: "/app", element: <Home /> },
]);