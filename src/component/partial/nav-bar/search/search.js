import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { getProductsBySearch } from "../../../../redux/products/productSlice";
import styled, { keyframes } from "styled-components";

const activeSearch = keyframes`
0%{
  transform: translateX(-100%);
}
100%{
  transform: translateX(0);
}
`;
const StyleSearch = styled.div`
  background-color: #ffffff;
  font-family: "Inter", sans-serif;
  color: #181818;
  animation: ${activeSearch} 0.25s linear;
  & > .input-search {
    position: relative;
    z-index: 1;
    & > input {
      outline: none;
      border: none;
      font-size: 1.25rem;
      padding: 1rem 12px;
      width: 90%;
    }
    & > .close-search {
      position: absolute;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%) !important;
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      right: 0;
      left: 0;
      background-color: #d4d4d4;
    }
  }
  & > .wrapper {
    padding: 1rem 12px;
    & > .result-search > .product-found > ul {
      padding: 0;
    }
  }
`;
const SearchUI = ({ setActiveSearch }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [filter, setFilter] = useState("");
  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.name.includes(filter));
  }, [products, filter]);
  function handelClickResultSearch(product) {
    dispatch(getProductsBySearch(product));
    setActiveSearch(false);
  }

  return (
    <StyleSearch className="search active">
      <div className="input-search">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <div className="close-search">
          <IconButton
            aria-label="Example"
            onClick={() => {
              setActiveSearch(false);
            }}
          >
            <ClearIcon style={{ color: "#181818" }} />
          </IconButton>
        </div>
      </div>
      <div className="wrapper">
        <div className="result-search">
          <div className="product-found">
            <ul className="list-product-found">
              {filter && (
                <>
                  <span className="product-title">PRODUCTS</span>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      {filteredProducts.map((product, index) => {
                        return (
                          <ListItem
                            key={index + 1}
                            disablePadding
                            onClick={() => {
                              handelClickResultSearch(product);
                            }}
                          >
                            <ListItemButton>
                              <span>{product.name}</span>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </nav>
                </>
              )}
            </ul>
          </div>
          <div className="product-popular">
            <span className="product-title">POPULAR SEARCHES</span>
            <ul className="list-product-found"></ul>
          </div>
        </div>
      </div>
    </StyleSearch>
  );
};
export default SearchUI;
