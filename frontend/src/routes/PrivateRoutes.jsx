import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const isLogged = true;

  return isLogged ? <Outlet /> : <Navigate to={"/"} />;
};
