/* eslint-disable react-hooks/exhaustive-deps */
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Icon from "@mui/material/Icon";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import styled, { keyframes } from "styled-components";
import Badge from "@mui/material/Badge";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { logout, getProductInCartByUser } from "../../../redux/users/users";
import {
  getProducts,
  getProductsBySearch,
} from "../../../redux/products/productSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
const HoverButtonSearch = keyframes`
0%{
  transform: translateX(100%);
}
100%{
  transform: translateX(0);
}
`;
const SearchProduct = styled.li`
  transition: all 0.3s ease-in-out;
  position: relative;
  & > div {
    display: none;
    transition: all 0.3s ease-in-out;
    & > input {
      padding: 10px;
      border-radius: 0.5rem;
    }
    & > input:focus {
      border: 1px solid black;
    }
  }
  &:hover > div.search {
    animation: ${HoverButtonSearch} 0.25s linear;
    display: block;
  }
  & > .result-search {
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 0.5rem;
    z-index: 99;
    width: 250px;
    max-height: 400px;
    overflow: hidden;
    overflow-y: scroll;
  }
  & > .result-search.show {
    display: block;
  }
  & > .result-search.hide {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    &:hover > div.search {
      display: none;
    }
  }
`;

const AccountStyle = styled.li`
  position: relative;
  & > .box-hidden {
    font-family: "Open Sans", sans-serif;
    position: absolute;
    width: 150px;
    padding: 10px 0;
    display: none;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-radius: 1rem;
    z-index: 99;
    left: -100px;
    gap: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    & > a {
      color: #181818;
      text-decoration: none;
      transition: all 0.1s ease-in-out;
      padding: 10px;
    }
    & > a:hover {
      text-decoration: underline;
      background-color: #dbdbdb4d;
    }
  }
  &:hover > .box-hidden {
    display: flex;
  }
`;
const Information = ({ setSideBar, setActiveSearch, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogined, cart } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState("");
  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.name.includes(filter));
  }, [products, filter]);
  const inputRef = useRef(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getProductInCartByUser(user.id));
    }
    dispatch(getProducts());
  }, [dispatch]);
  function getTotal() {
    return (
      cart &&
      cart.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0)
    );
  }
  function handelClickCart() {
    navigate("/cart");
  }
  function handelClickLogout() {
    dispatch(logout());
  }
  function handelChangeSearch(e) {
    if (e.target.value) {
      setFilter(e.target.value);
    } else {
      setFilter("");
    }
  }
  function handelClickResultSearch(product) {
    dispatch(getProductsBySearch(product));
  }
  function handelClickMenu() {
    setSideBar(true);
  }
  function handelClickBtnSearch() {
    if (window.innerWidth <= 1024) {
      dispatch(getProductsBySearch(products));
      setActiveSearch(true);
    } else {
      dispatch(getProductsBySearch(filteredProducts));
    }
    inputRef.current.value = "";
  }
  function handleFocus() {
    setShowResults(true);
  }
  function handleMouseOver() {
    setShowResults(true);
  }
  function handleMouseOut() {
    setShowResults(false);
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handelClickBtnSearch();
    }
  };
  return (
    <>
      <ul className="menu_nav min_w-1024">
        <SearchProduct
          className={`nav_item`}
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            className={`search`}
            value={filter}
            onChange={(e) => {
              handelChangeSearch(e);
            }}
            onFocus={handleFocus}
            onMouseOut={handleMouseOut}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <IconButton
            onClick={() => {
              handelClickBtnSearch();
            }}
          >
            <SearchIcon
              className="icon_search icon"
              style={{ color: "#181818", fontSize: "1.75rem" }}
            />
          </IconButton>
          <div
            className={`result-search ${showResults ? "show" : "hide"}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {filter ? (
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
            ) : (
              <nav aria-label="secondary mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <span>No matching products found</span>
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            )}
          </div>
        </SearchProduct>
        <AccountStyle className="nav_item account">
          <IconButton>
            <AccountCircleIcon
              className="icon_account icon"
              style={{ color: "#181818" }}
            />
          </IconButton>
          {!isLogined && (
            <div className="box-hidden">
              <Link to="/login">
                <span>Sign In</span>
              </Link>
              <Link to="/createAccount">
                <span>Create Account </span>
              </Link>
            </div>
          )}
          {isLogined && (
            <div className="box-hidden">
              <Link to="/profile">
                <span>Profile</span>
              </Link>
              <Link>
                <span>Order History</span>
              </Link>
              <Link
                onClick={() => {
                  handelClickLogout();
                }}
              >
                <span>Log Out</span>
              </Link>
            </div>
          )}
        </AccountStyle>
        <li className="nav_item">
          <IconButton>
            <Icon
              className="flag-icon flag-icon-us"
              style={{
                color: "#181818",
                backgroundImage:
                  "url('https://www.popsockets.com/on/demandware.static/Sites-AMER-Site/-/en_US/v1668229434652/fonts/flags//4x3/us.svg')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></Icon>
          </IconButton>
        </li>
        <li className="nav_item">
          <Tooltip
            title={`cart ${getTotal()} Items`}
            placement="bottom-end"
            color="white"
          >
            <Badge
              color="secondary"
              overlap="circular"
              badgeContent={getTotal()}
            >
              <IconButton onClick={() => handelClickCart()}>
                <ShoppingBagIcon
                  className="icon_bag icon"
                  style={{ color: "#181818" }}
                />
              </IconButton>
            </Badge>
          </Tooltip>
        </li>
      </ul>
      <ul className="menu_nav max_w-1024">
        <SearchProduct
          className="nav_item"
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          <IconButton
            onClick={() => {
              handelClickBtnSearch();
            }}
          >
            <SearchIcon
              className="icon_search icon"
              style={{ color: "#181818" }}
            />
          </IconButton>
        </SearchProduct>
        <li className="nav_item">
          <IconButton>
            <Icon
              className="flag-icon flag-icon-us"
              style={{
                color: "#181818",
                backgroundImage:
                  "url('https://www.popsockets.com/on/demandware.static/Sites-AMER-Site/-/en_US/v1668229434652/fonts/flags//4x3/us.svg')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></Icon>
          </IconButton>
        </li>
        <li className="nav_item">
          <Tooltip
            title={`cart ${getTotal()} Items`}
            placement="bottom-end"
            color="white"
          >
            <Badge
              color="secondary"
              overlap="circular"
              badgeContent={getTotal()}
            >
              <IconButton onClick={() => handelClickCart()}>
                <ShoppingBagIcon
                  className="icon_bag icon"
                  style={{ color: "#181818" }}
                />
              </IconButton>
            </Badge>
          </Tooltip>
        </li>
        <li className="nav_item">
          <IconButton onClick={() => handelClickMenu()}>
            <MenuIcon className="icon_menu icon" style={{ color: "#181818" }} />
          </IconButton>
        </li>
      </ul>
    </>
  );
};
export default Information;
