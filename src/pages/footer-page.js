import Footer from "../component/UI/footer/footer";
import React from "react";
const FooterPage = ({ sideBar, activeSearch, ...props }) => {
  return (
    <div
      style={{
        padding: "10px 2rem",
        display: `${activeSearch ? "none" : "block"}`,
      }}
    >
      {!sideBar && <Footer activeSearch={activeSearch} />}
    </div>
  );
};
export default FooterPage;
