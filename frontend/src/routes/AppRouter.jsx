import { Navigate, Route, Routes } from "react-router-dom";
import { Registro } from "../pages/Registro.jsx";
import { Login } from "../pages/Login.jsx";
import { Home } from "../pages/Home.jsx";
import { UserProfile } from "../pages/Perfil.jsx";
import Calculadora from "../pages/Calculadora.jsx";
import { CatalogoElectrodomesticos } from "../pages/Catalogo.jsx";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path={"*"} element={<Registro />} />
        <Route path={"/"} element={<Registro />} />
        <Route path={"/login"} element={<Login />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path={"/home"} element={<Home />} />
        <Route path={"/calculator"} element={<Calculadora />} />
        <Route path={"/user/profile"} element={<UserProfile />} />
        <Route
          path={"/appliance/catalog"}
          element={<CatalogoElectrodomesticos />}
        />
      </Route>
    </Routes>
  );
};
