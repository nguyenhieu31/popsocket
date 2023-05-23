import ChangePassword from "../component/UI/change-password/change-password";
import React from "react";
const ChangePasswordPage = ({ sideBar, activeSearch }) => {
  return <>{!sideBar && <ChangePassword activeSearch={activeSearch} />}</>;
};
export default ChangePasswordPage;
