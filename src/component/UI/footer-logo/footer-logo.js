import { Link } from "react-router-dom";
import React from "react";
const FooterLogo = () => {
  return (
    <div
      className="logo"
      style={{
        width: "100%",
        textAlign: "center",
        cursor: "pointer",
        marginTop: "2rem",
      }}
    >
      <Link>
        <img
          src="https://www.popsockets.com/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dweab14b90/images/homepage/poppuck-thumb-icon-sticker-small.png"
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      </Link>
    </div>
  );
};
export default FooterLogo;
