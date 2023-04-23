import Icon from "@mui/material/Icon";
import styled from "styled-components";
import React from "react";
const Styled = styled.ul`
  font-family: "Open Sans", sans-serif;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 4rem 0;
  & > li {
    cursor: pointer;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    & > .divided {
      width: 1px;
      height: 100%;
      background-color: #000000;
    }
  }
  @media screen and (max-width: 768px) {
    justify-content: center;
    & > li {
      font-size: 12px;
    }
  }
`;
const TermsAndPolicies = () => {
  return (
    <Styled>
      <li>
        <span className="text">international</span>
        <Icon
          className="flag-icon flag-icon-us"
          style={{
            color: "#181818",
            fontSize: "1rem",
            backgroundImage:
              "url('https://www.popsockets.com/on/demandware.static/Sites-AMER-Site/-/en_US/v1668229434652/fonts/flags//4x3/us.svg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></Icon>
        <span className="divided"></span>
      </li>
      <li>
        <span className="text">Terms & Conditions</span>
        <span className="divided"></span>
      </li>
      <li>
        <span className="text">Policies</span>
        <span className="divided"></span>
      </li>
      <li>
        <span className="text">Intellectual Property</span>
        <span className="divided"></span>
      </li>
      <li>
        <span className="text">Website Accessibility</span>
      </li>
    </Styled>
  );
};
export default TermsAndPolicies;
