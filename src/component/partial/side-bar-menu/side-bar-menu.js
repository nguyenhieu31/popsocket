/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductMenuItem } from "../../../redux/menuItem/menuItemSlice";
import { getProducts } from "../../../redux/products/productSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
const MenuChild = styled.div`
  display: none;
  position: absolute;
  z-index: 99;
  width: 100%;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  transition: all 1s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  & > .menu_child {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 2rem;
  }
  .product_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: #f9f9f9;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .product_item > a {
    text-decoration: none;
    color: #181818;
    font-size: 1.25rem;
    font-family: "Open Sans", sans-serif;
  }
  .product_item > a:hover {
    text-decoration: underline;
  }
  .product_item > img {
    width: 60px;
    height: 60px;
  }
`;
const MenuItem = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  position: relative;
  gap: 2rem;
  & > li {
    list-style: none;
  }
  & > li > a {
    color: #181818;
    text-decoration: none;
    transition: all 0.5s ease-in-out;
    font-weight: bold;
    font-family: "Open Sans", sans-serif;
  }
  & > li:hover > a {
    text-decoration: underline;
  }
  & > li > .menu_item-list {
    transition: all 1s ease-in-out;
  }
  & > li:hover > .menu_item-list {
    display: block;
  }
`;
const MenuParent = styled.ul`
  position: absolute;
  padding: 10px 0;
  list-style: none;
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  width: max-content;
  left: -10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  background-color: #f9f9f9;
  border-radius: 0 0 10px 10px;
  z-index: 1;
  & > li {
    padding: 1rem 1rem 1rem 10px;
    font-family: "Open Sans", sans-serif;
    cursor: pointer;
  }
  & > li > a {
    color: #181818;
    text-decoration: none;
    width: 100% !important;
  }
  & > li:hover {
    background-color: #dfdede9c;
  }
  & > li:hover > a {
    text-decoration: underline;
  }

  & > li:hover > .list_item-child {
    display: flex;
  }
`;
const ListItemChild = styled.ul`
  position: absolute;
  left: -217px;
  top: 0;
  padding: 10px 0;
  list-style: none;
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  width: max-content;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  & > li {
    padding: 10px;
    font-family: "Open Sans", sans-serif;
    cursor: pointer;
  }
  & > li > a {
    text-decoration: none;
    color: #181818;
  }
  & > li:hover {
    background-color: #dfdede9c;
  }
  & > li:hover > a {
    text-decoration: underline;
  }
`;
const SideBarMenu = () => {
  const dispatch = useDispatch();
  // const [productMenuItem, setProductMenuItem] = useState([])
  useEffect(() => {
    dispatch(getProductMenuItem());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { menuItem } = useSelector((state) => state.menuItem);
  function handleCLickPage() {
    dispatch(getProducts());
  }
  return (
    <MenuItem className="menu_item hidden">
      {menuItem.map((product, index) => {
        const { name, arrayItems } = product;
        return (
          <li key={index + 1}>
            <Link
              to={`/${name}`}
              onClick={() => {
                handleCLickPage();
              }}
            >
              {name}
            </Link>
            {arrayItems.length !== 0 ? (
              <MenuChild className="menu_item-list">
                <Grid
                  className="menu_child"
                  container
                  spacing={3}
                  sx={{ margin: "0", gap: "3rem", maxWidth: "100%" }}
                >
                  {arrayItems.map((item, index) => {
                    const { name_thumbnail, image } = item;
                    return (
                      <Grid item xs style={{ padding: "0" }} key={index + 1}>
                        <div className="product_item">
                          <Link>
                            <span className="item_text">{name_thumbnail}</span>
                          </Link>
                          <img src={image} alt="..."></img>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </MenuChild>
            ) : (
              ""
            )}
          </li>
        );
      })}
      <li style={{ position: "relative" }}>
        <Link>
          <span className="item_text">More</span>
        </Link>
        <MenuParent className="menu_item-list">
          <li className="menu_child-item">
            <Link>
              <span className="item_text">Custom</span>
            </Link>
          </li>
          <li className="menu_child-item">
            <Link>
              <span className="item_text">Mounts</span>
            </Link>
          </li>
          <li className="menu_child-item" style={{ position: "relative" }}>
            <Link>
              <span className="item_text">Collabs</span>
            </Link>
            <ListItemChild className="list_item-child">
              <li>
                <Link>
                  <span className="item_text">Entertainment</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span className="item_text">Brands</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span className="item_text">Sports</span>
                </Link>
              </li>
              <li>
                <Link>
                  <span className="item_text">Burt's Bees X PopGrip Lips</span>
                </Link>
              </li>
            </ListItemChild>
          </li>
          <li className="menu_child-item">
            <Link>
              <span className="item_text">Corporate Sales</span>
            </Link>
          </li>
          <li className="menu_child-item">
            <Link>
              <span className="item_text">Purpose</span>
            </Link>
          </li>
        </MenuParent>
      </li>
    </MenuItem>
  );
};
export default SideBarMenu;
