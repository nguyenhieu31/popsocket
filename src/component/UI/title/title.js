import styled from "styled-components";
import React from "react";
const Title = styled.div`
  text-align: center;
  margin: 4rem 0;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
`;
const TitleRender = () => {
  return (
    <Title className="title">
      <h1>New</h1>
    </Title>
  );
};
export default TitleRender;
