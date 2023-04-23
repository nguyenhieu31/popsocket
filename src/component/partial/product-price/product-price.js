import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styled from "styled-components";
import { Link } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { getProductByPrice } from "../../../redux/products/productSlice";
const ListPriceProduct = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  padding: 0 0 1rem 0;
  background-color: #f4f4f4;
  flex-wrap: wrap;
  z-index: 99;
  .price {
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #e0cfcf9e;
    & > a {
      text-decoration: none;
      color: #181818;
    }
  }
`;
const denominations = [
  {
    firstPrice: 10,
    lastPrice: 20,
  },
  {
    firstPrice: 20,
    lastPrice: 30,
  },
  {
    firstPrice: 30,
    lastPrice: 40,
  },
  {
    firstPrice: 40,
    lastPrice: 50,
  },
];
const ProductPrice = ({ isClickProductPrice, ...props }) => {
  const dispatch = useDispatch();
  return (
    <>
      <>
        <h4>Price</h4>
        {isClickProductPrice ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
      </>
      {isClickProductPrice ? (
        <ListPriceProduct>
          {denominations.length > 0 &&
            denominations.map((item, index) => {
              const { firstPrice, lastPrice } = item;
              return (
                <li
                  className="price"
                  key={index}
                  onClick={() => {
                    dispatch(getProductByPrice(item));
                  }}
                >
                  <Link>
                    <span>
                      ${firstPrice}.00-${lastPrice}.00
                    </span>
                  </Link>
                </li>
              );
            })}
        </ListPriceProduct>
      ) : (
        ""
      )}
    </>
  );
};
export default ProductPrice;
