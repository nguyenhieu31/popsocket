import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
const PrivatePage = () => {
  const { isLogined } = useSelector((state) => state.users);
  return isLogined ? <Outlet /> : <Navigate to="/new" />;
};
export default PrivatePage;
