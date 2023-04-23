import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import React, { useState } from "react";
import { sortProductsByPrice } from "../../../redux/products/productSlice";
import { useDispatch } from "react-redux";
const ListOptions = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 1;
  top: 96%;
  background-color: #fff;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 3rem;
  border-radius: 10px;
  padding: 0;
  li {
    color: #181818;
    width: 100%;
    text-align: center;
    transition: all 0.1s ease-in-out;
    margin: 0 1.5rem;
  }
  li:hover {
    background-color: #3091e7;
    color: #fff;
  }
`;
const optionSort = [
  "Bests sellers",
  "Featured",
  "Price Low To High",
  "Price High To Low",
  "Recommended",
  "Newest",
];
const SortProduct = ({ isClickSortProduct, ...props }) => {
  const dispatch = useDispatch();
  const [typeSort, setTypeSort] = useState("Best Sellers");
  const handleSortProducts = (typeSort) => {
    setTypeSort(typeSort);
    dispatch(sortProductsByPrice(typeSort));
  };
  return (
    <>
      <>
        <h4>Sort By:</h4>
        {isClickSortProduct ? (
          <div className="section active">
            <span>{typeSort}</span>
            <ExpandMoreIcon />
          </div>
        ) : (
          <div className="section">
            <span>{typeSort}</span>
            <ExpandMoreIcon />
          </div>
        )}
      </>
      {isClickSortProduct ? (
        <ListOptions className="list-options">
          {optionSort.map((option, index) => {
            if (index === 0) {
              return (
                <li
                  className="item"
                  style={{ borderRadius: "10px 10px 0 0" }}
                  key={index}
                  onClick={() => {
                    handleSortProducts(option);
                  }}
                >
                  <span>{option}</span>
                </li>
              );
            } else if (index === optionSort.length - 1) {
              return (
                <li
                  className="item"
                  style={{ borderRadius: "0 0 10px 10px" }}
                  key={index}
                  onClick={() => {
                    handleSortProducts(option);
                  }}
                >
                  <span>{option}</span>
                </li>
              );
            } else {
              return (
                <li
                  className="item"
                  key={index}
                  onClick={() => {
                    handleSortProducts(option);
                  }}
                >
                  <span>{option}</span>
                </li>
              );
            }
          })}
        </ListOptions>
      ) : (
        ""
      )}
    </>
  );
};
export default SortProduct;
