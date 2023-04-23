import NumberProduct from "../../partial/number-product/number-product";
import Classify from "../classify/classify";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import styled from "styled-components";
import React from "react";
const ResClassifier = styled.div`
  & > .classify-product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    margin-top: 4rem;
    overflow: visible;
  }
  & > .classify-product.max_w-1024 {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    & > .classify-product.min_w-1024 {
      display: none;
    }
    & > .classify-product.max_w-1024 {
      display: flex;
      justify-content: center;
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.7rem;
        padding: 1rem 1.5rem;
        border-radius: 2rem;
        background-color: #181818;
        color: white;
        cursor: pointer;
        font-family: "Open Sans", sans-serif;
        transform: scale(1);
        transition: transform 0.3s ease-in-out;
        &:hover {
          background-color: #181818d1;
          transform: scale(1.05);
        }
      }
    }
  }
`;
const ClassifyProducts = () => {
  return (
    <>
      <ResClassifier>
        <div className="classify-product min_w-1024">
          <NumberProduct />
          <Classify />
        </div>
        <div className="classify-product max_w-1024">
          <div>
            <SyncAltIcon />
            <span>Filter & Sort</span>
          </div>
        </div>
      </ResClassifier>
    </>
  );
};
export default ClassifyProducts;
