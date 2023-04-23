import LoginUi from "../component/UI/login-ui/login-ui";
import React from "react";
const LoginCreateAccPage = ({ sideBar, activeSearch }) => {
  return <>{!sideBar && <LoginUi activeSearch={activeSearch} />}</>;
};
export default LoginCreateAccPage;
