import ProfileUi from "../component/partial/profile-ui/profile-ui";
import React from "react";
const ProfilePage = ({ sideBar, activeSearch }) => {
  return <>{!sideBar && <ProfileUi activeSearch={activeSearch} />}</>;
};
export default ProfilePage;
