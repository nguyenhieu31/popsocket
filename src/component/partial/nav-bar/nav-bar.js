import styled from "styled-components";
import Logo from "../../UI/logo/logo";
import Information from "../information/information";
import SideBarMenu from "../side-bar-menu/side-bar-menu";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductInCartByUser,
  loginSuccess,
} from "../../..//redux/users/users";
import { getProductMenuItem } from "../../../redux/menuItem/menuItemSlice";
import MenuActive from "./menu-active/menu-active";
import SearchUI from "./search/search";
const StyleNavBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 2rem;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  transition: top 0.5s ease-in-out;
  .container {
    display: grid;
    grid-template-columns: 57% 43%;
  }
  .logo {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .logo_link {
    background: url("https://www.popsockets.com/on/demandware.static/Sites-AMER-Site/-/en_US/v1667797420334/images/logo.svg")
      no-repeat center;
    background-size: contain;
    width: 210px;
    height: 60px;
    display: block;
  }
  .menu_nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
  }
  .menu_nav.max_w-1024 {
    display: none;
  }
  .menu_nav > li {
    list-style: none;
    color: #181818;
    & > button {
      & > span,
      & > svg {
        font-size: 1.75rem;
      }
    }
  }
  .nav_item .search {
    color: #181818;
    font-size: 1rem;
    width: 100px;
  }
  @media screen and (min-width: 1024px) {
    & > .menu > .menu_item.active {
      display: none;
    }
  }
  @media screen and (max-width: 1024px) {
    .logo {
      display: flex;
      justify-content: flex-start;
    }
    .menu_nav.min_w-1024 {
      display: none;
    }
    .menu_nav.max_w-1024 {
      display: flex;
    }
    & > .menu > .menu_item.hidden {
      display: none;
    }
    &.active {
      position: absolute;
      width: 107%;
      min-height: 100vh;
      background-color: red;
      top: 0;
      left: -32px;
      z-index: 99;
    }
  }
  @media screen and (max-width: 545px) {
    & > .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    & > .container > .menu_nav {
      gap: 0;
      & > li {
        & > button {
          & > span,
          & > svg {
            font-size: 1.35rem;
          }
        }
      }
    }
  }
`;
const NavBar = ({
  sideBar,
  setSideBar,
  activeSearch,
  setActiveSearch,
  scrolled,
  ...props
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getProductInCartByUser(user.id));
      dispatch(loginSuccess(user));
    }
    dispatch(getProductMenuItem());
  }, [dispatch]);
  const { menuItem } = useSelector((state) => state.menuItem);
  return (
    <>
      {sideBar ? (
        <MenuActive
          sideBar={sideBar}
          setSideBar={setSideBar}
          menuItem={menuItem}
        />
      ) : (
        <>
          <StyleNavBar
            className="header hidden"
            style={{
              top: `${scrolled}px`,
              display: `${activeSearch ? "none" : "flex"}`,
            }}
          >
            <div className="container">
              <Logo />
              <Information
                setSideBar={setSideBar}
                setActiveSearch={setActiveSearch}
              />
            </div>
            <div className="menu">
              <SideBarMenu />
            </div>
          </StyleNavBar>
          {activeSearch && <SearchUI setActiveSearch={setActiveSearch} />}
        </>
      )}
    </>
  );
};
export default NavBar;
