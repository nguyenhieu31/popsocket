import CreateAccountUi from "../component/UI/createAcc-ui/createAcc-ui";
import React from "react";
const CreateAccPage = ({ sideBar, activeSearch }) => {
  return <>{!sideBar && <CreateAccountUi activeSearch={activeSearch} />}</>;
};
export default CreateAccPage;
