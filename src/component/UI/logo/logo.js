import { Link } from "react-router-dom";
import styled from "styled-components";
import React from "react";
const StyleLogo = styled.div`
  @media screen and (max-width: 545px) {
    width: 160px;
  }
`;
const Logo = () => {
  return (
    <StyleLogo className="logo">
      <Link className="logo_link"></Link>
    </StyleLogo>
  );
};
export default Logo;
