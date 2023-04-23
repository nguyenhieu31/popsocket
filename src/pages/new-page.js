import NewUi from "../component/UI/Ui-new/new_ui";
import React from "react";
const NewPage = ({ sideBar, activeSearch, ...props }) => {
  return <>{!sideBar && <NewUi activeSearch={activeSearch} />}</>;
};
export default NewPage;
