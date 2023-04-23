import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const DownloadApp = () => {
  const [activeImgDownload, setActiveImgDownload] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setActiveImgDownload(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        setActiveImgDownload(true);
      } else {
        setActiveImgDownload(false);
      }
    });
  }, []);
  return (
    <div
      className="introduction-app"
      style={{
        marginTop: "2rem",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        fontFamily: "'Open Sans', sans-serif",
        color: "#181818",
      }}
    >
      <p>
        <b>Did you know we have an app?</b> create shareable art and custom
        PopSockets designs with our unique image editing tools
      </p>
      <Link style={{ color: "#181818" }}>
        {activeImgDownload ? (
          <div className="footer-download">
            <img
              src="https://www.popsockets.com/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dw26f6320f/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917%201.png"
              alt=""
            />
          </div>
        ) : (
          <span>Download for IOS</span>
        )}
      </Link>
    </div>
  );
};
export default DownloadApp;
