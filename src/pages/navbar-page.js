import NavBar from "../component/partial/nav-bar/nav-bar";
import React from "react";
const NavBarPage = ({
  sideBar,
  setSideBar,
  activeSearch,
  setActiveSearch,
  scrolled,
  ...props
}) => {
  return (
    <NavBar
      sideBar={sideBar}
      setSideBar={setSideBar}
      scrolled={scrolled}
      activeSearch={activeSearch}
      setActiveSearch={setActiveSearch}
    />
  );
};
export default NavBarPage;
