// import { Link } from "react-router-dom";
import FooterContact from "../footer-contact/footer-contact";
import FooterLogo from "../footer-logo/footer-logo";
import DownloadApp from "../download-app/download-app";
import TermsAndPolicies from "../terms-and-policies/terms-and-policies";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styled from "styled-components";
import React from "react";
const HoverA = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  & > a > svg {
    color: #181818;
    transition: all 0.3s ease-in-out;
  }
  & > a:hover > svg {
    color: #1818187a;
  }
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
const Footer = () => {
  return (
    <>
      <FooterContact />
      <FooterLogo />
      <DownloadApp />
      <HoverA className="footer-contact">
        <Link>
          <FacebookIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
        <Link>
          <InstagramIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
        <Link>
          <PinterestIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
        <Link>
          <TwitterIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
        <Link>
          <YouTubeIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
        </Link>
      </HoverA>
      <TermsAndPolicies />
    </>
  );
};
export default Footer;
