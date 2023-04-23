import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const HoverA = styled.div`
  display: flex;
  align-items: center;
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
    display: none;
  }
`;
const HoverLi = styled.ul`
  & > li {
    transition: all 0.3s ease-in-out;
  }
  & > li:hover {
    color: #1818187a;
  }
`;
const FooterContactStyle = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 2fr;
  font-family: 'Open Sans', sans-serif;
  margin-top: 4rem;
  color: #181818;
  &>div{
    padding-left: 20px;
    &>.footer-title{
      cursor: context-menu;
      &>.icon{
        display: none;
      } 
    }
    &>ul.footer-content{
      display: flex;
    }
  }
  &>div:nth-child(1){
    padding-left: 0;
    padding-right: 4rem;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: none;
    gap: 1rem;
    font-size: 12px;
    &>div:nth-child(1),
    &>div{
      padding: 0;
      &>.footer-title{
        cursor: pointer;
        &>.icon{
          display: block;
        } 
      }
    }
    &>div:nth-child(1){
      align-items:center;
    }
    &>div:nth-child(2){
      &>ul.footer-content{
        display: ${(props) => (props.FooterContent1 ? "flex" : "none")}
      }
    }
    &>div:nth-child(3){
      &>ul.footer-content{
        display: ${(props) => (props.FooterContent2 ? "flex" : "none")}
      }
    }
    &>div:nth-child(4){
      &>ul.footer-content{
        display: ${(props) => (props.FooterContent3 ? "flex" : "none")}
      }
    }
`;
const FooterContact = () => {
  const [FooterContent1, setFooterContent1] = useState(false);
  const [FooterContent2, setFooterContent2] = useState(false);
  const [FooterContent3, setFooterContent3] = useState(false);
  function handelFooterContent(action1, action2, action3) {
    if (action1 > 0) {
      if (FooterContent1) {
        setFooterContent1(false);
      } else {
        setFooterContent1(true);
      }
    } else if (action2 > 0) {
      if (FooterContent2) {
        setFooterContent2(false);
      } else {
        setFooterContent2(true);
      }
    } else {
      if (FooterContent3) {
        setFooterContent3(false);
      } else {
        setFooterContent3(true);
      }
    }
  }
  return (
    <FooterContactStyle
      FooterContent1={FooterContent1}
      FooterContent2={FooterContent2}
      FooterContent3={FooterContent3}
    >
      <div
        className="footer-item"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 className="footer-title">Grab 10% off your next order</h2>
        <div
          className="footer-control"
          style={{ position: "relative", width: "100%" }}
        >
          <input
            type="text"
            placeholder="Email"
            className="footer-form"
            style={{
              width: "100%",
              padding: "10px 0 10px 2px",
              borderRadius: "5px",
              outline: "none",
            }}
          />
          <i
            className="fa-solid fa-arrow-right"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "10px",
              cursor: "pointer",
            }}
          ></i>
        </div>
        <p className="footer-content">
          By enter your email address you agree to receive our newsletter
          communications by email. You can unsubscribe at any time. Please see
          our {<Link style={{ color: "#181818" }}>Terms & Conditions</Link>} and{" "}
          {<Link style={{ color: "#181818" }}>Privacy Policy</Link>} for more
          details.
        </p>
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
      </div>
      <div className="footer-item">
        <div
          className="footer-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => {
            handelFooterContent(1, 0, 0);
          }}
        >
          <h2>Purpose</h2>
          <div className="icon">
            {FooterContent1 ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </div>
        </div>
        <HoverLi
          className="footer-content"
          style={{
            cursor: "pointer",
            listStyle: "none",
            padding: "0",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <li className="text">Explore Our Purpose</li>
          <li className="text">Environmental & Social Impact</li>
          <li className="text">Nonprofit Partnerships</li>
          <li className="text">Product Recycling</li>
          <li className="text">Animal Welfare Policy</li>
          <li className="text">Supply Chain and Modern Slavery Disclosure</li>
        </HoverLi>
      </div>
      <div className="footer-item">
        <div
          className="footer-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => {
            handelFooterContent(0, 1, 0);
          }}
        >
          <h2>Customer Service</h2>
          <div className="icon">
            {FooterContent2 ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </div>
        </div>
        <HoverLi
          className="footer-content"
          style={{
            cursor: "pointer",
            listStyle: "none",
            padding: "0",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <li className="text">Help Center</li>
          <li className="text">Orders</li>
          <li className="text">Order Status</li>
          <li className="text">Returns</li>
          <li className="text">Contact Us</li>
          <li className="text">Report a Fake Product</li>
          <li className="text">Fundraising</li>
        </HoverLi>
      </div>
      <div className="footer-item">
        <div
          className="footer-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => {
            handelFooterContent(0, 0, 1);
          }}
        >
          <h2>About</h2>
          <div className="icon">
            {FooterContent3 ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </div>
        </div>
        <HoverLi
          className="footer-content"
          style={{
            cursor: "pointer",
            listStyle: "none",
            padding: "0",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <li className="text">About us</li>
          <li className="text">Student Discount</li>
          <li className="text">Jobs</li>
          <li className="text">Newsroom</li>
          <li className="text">Distributor</li>
          <li className="text">Corporate Sales</li>
          <li className="text">Careers</li>
        </HoverLi>
      </div>
    </FooterContactStyle>
  );
};
export default FooterContact;
