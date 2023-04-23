/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useProductOutstanding from "../../../hooks/useProductOutstanding";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
const Products = styled.ul`
  list-style: none;
  display: flex;
  cursor: pointer;
  padding: 0 0 1rem 0;
  margin: 0;
  transition: all 0.1s ease-in-out;
  transition-duration: 0.3s;
  width: ${(props) => props.sizeProduct * (100 / props.productDisplay)}%;
  & > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% / ${(props) => props.productDisplay});
    gap: 1rem;
    text-align: center;
    img {
      width: 75px;
    }
    a {
      text-decoration: none;
      color: #181818;
      font-weight: 600;
      font-family: "Open Sans", sans-serif;
    }
    a:hover {
      color: #181818b5;
    }
  }
`;
const ResProduct = styled.div`
  min-width: 100%;
  @media screen and (max-width: 1024px) {
    & > ul {
      width: ${(props) => props.sizeProduct * 100}%;
      & > li {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 545px) {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      height: 6px;
      background-color: none;
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background-color: none;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: none;
    }
    & > ul {
      width: ${(props) =>
        props.sizeProduct * ((100 / props.productDisplay) * 2)}%;
      & > li {
        width: calc(100% / ${(props) => props.productDisplay});
      }
    }
  }
`;
const ProductsOutstanding = () => {
  const { productOutstanding } = useProductOutstanding();
  const [location, setLocation] = useState(0);
  const [productDisplay, setProductDisplay] = useState(6);
  const [controller, setController] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1024) {
        if (window.innerWidth <= 545) {
          setProductDisplay(6);
          setController(true);
        } else {
          setProductDisplay(1);
          setController(false);
        }
      } else {
        setProductDisplay(6);
        setController(false);
      }
    });
    if (window.innerWidth <= 1024) {
      if (window.innerWidth <= 545) {
        setProductDisplay(6);
        setController(true);
      } else {
        setProductDisplay(1);
        setController(false);
      }
    } else {
      setProductDisplay(6);
      setController(false);
    }
  }, []);
  let countItemHidden = 0;
  function getCountItemHidden() {
    for (let i = productDisplay; i < productOutstanding.length; i++) {
      countItemHidden += 1;
    }
  }
  function handelClickNextProduct(size) {
    if (size > 0) {
      setLocation(location + -(100 / size));
    }
  }
  function handelClickPrevProduct(size) {
    if (size > 0) {
      setLocation(location - -(100 / size));
    }
  }
  return (
    <div
      style={{
        minWidth: "100%",
        position: "relative",
        borderBottom: "1px solid #18181833",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <ResProduct
          productDisplay={productDisplay}
          sizeProduct={`${productOutstanding.length}`}
        >
          <Products
            className="products"
            productDisplay={productDisplay}
            sizeProduct={`${productOutstanding.length}`}
            style={{ transform: `translate3d(${location}%,0px,0px)` }}
          >
            {getCountItemHidden()}
            {productOutstanding &&
              productOutstanding.map((product, index) => {
                return (
                  <li
                    className={`product-item`}
                    data-index={index + 1}
                    key={index}
                  >
                    <img src={product.image} alt="..." />
                    <Link className="product-name">{product.name}</Link>
                  </li>
                );
              })}
          </Products>
        </ResProduct>
      </div>
      {controller ? (
        ""
      ) : (
        <>
          {location === 0 ? (
            ""
          ) : (
            <IconButton
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                transform: "translateY(-50%)",
              }}
              onClick={() => {
                handelClickPrevProduct(productOutstanding.length);
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}
          {location === countItemHidden * -(100 / productOutstanding.length) ? (
            ""
          ) : (
            <IconButton
              style={{
                position: "absolute",
                top: "50%",
                right: "0",
                transform: "translateY(-50%)",
              }}
              onClick={() => {
                handelClickNextProduct(productOutstanding.length);
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </>
      )}
    </div>
  );
};
export default ProductsOutstanding;
