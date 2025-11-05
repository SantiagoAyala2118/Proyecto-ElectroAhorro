import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  const isLogged = true;

  return !isLogged ? <Outlet /> : <Navigate to={"/home"} />;
};
