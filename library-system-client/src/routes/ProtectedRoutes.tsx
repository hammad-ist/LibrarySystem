import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

const ProtectedRoutes = () => {
  // TODO: Use authentication token
  const localStorageToken = sessionStorage.getItem("authToken");
  console.log(localStorageToken, "token");
  return localStorageToken ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoutes.authentication.login} replace />
  );
};

export default ProtectedRoutes;
