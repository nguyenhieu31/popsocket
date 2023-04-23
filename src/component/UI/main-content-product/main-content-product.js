import React, { useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const StyleMainContent = styled.div`
  & > .collapsible-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-top: 1px solid #d4d4d4;
    & > .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding: 1rem 0;
    }
    & > .body {
      display: none;
    }
    & > .body.active {
      display: block;
      & > .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0 1rem 1rem 1rem;
        padding: 0 1rem 1rem 1rem;
        & > h4 {
          margin: 0;
        }
      }
      & > ul {
        margin: 0 1rem 1rem 1rem;
        padding: 0 1rem 1rem 1rem;
      }
    }
  }
  & > .collapsible-content:nth-child(2) {
    border-bottom: 1px solid #d4d4d4;
  }
`;
const MainContentProduct = () => {
  const [activeSpecs, setActiveSpecs] = useState(false);
  const [activeCom, setActiveCom] = useState(false);
  function handelClickActiveSpecs() {
    if (!activeSpecs) {
      setActiveSpecs(true);
    } else {
      setActiveSpecs(false);
    }
  }
  function handelClickActiveCom() {
    if (!activeCom) {
      setActiveCom(true);
    } else {
      setActiveCom(false);
    }
  }
  return (
    <StyleMainContent>
      <div
        className="collapsible-content"
        onClick={() => {
          handelClickActiveSpecs();
        }}
      >
        <div className="header">
          <h4 className="title">Details and Specs</h4>
          {activeSpecs ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
        </div>
        <div className={`body ${activeSpecs ? "active" : ""}`}>
          <ul className="content">
            <li>Easily swap the top to change your style</li>
            <li>
              Functions as a convenient stand so you can watch videos on the fly
            </li>
            <li>Easily remove the top to wirelessly charge your phone</li>
            <li>
              Allows for hands-free use with the PopMounts. Compatible with all
              mounts sold today
            </li>
            <li>Dimensions: 38.8 mm diameter x 7.7 mm H (24.3 mmH expanded)</li>
          </ul>
        </div>
      </div>
      <div
        className="collapsible-content"
        onClick={() => {
          handelClickActiveCom();
        }}
      >
        <div className="header">
          <h4 className="title">Compatibility Check</h4>
          {activeCom ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
        </div>
        <div className={`body ${activeCom ? "active" : ""}`}>
          <div className="content">
            <h4 className="title">Works with:</h4>
            <ul>
              <li>
                Anything with a smooth hard plastic case; Will not stick to
                silicone, highly textured surfaces, and many soft cases
              </li>
            </ul>
            <h4 className="title">Doesn't work with:</h4>
            <ul>
              <li>Gel does not stick "as well" with naked iPhones.</li>
              <li>
                While it does stick adequately to a naked base model (and
                sometimes to Pro/Promax depending on circumstances), it will not
                stick "as well" as if you used a suitable case.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StyleMainContent>
  );
};
export default MainContentProduct;
