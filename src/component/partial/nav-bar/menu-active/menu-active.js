import React from "react";
import styled, { keyframes } from "styled-components";
import Logo from "../../../UI/logo/logo";
import { Link, useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../redux/users/users";
const activeMenu = keyframes`
    0%{
      transform: translateX(-100%);
    }
    100%{
      transform: translateX(0);
    }
`;
const StyleMenuActive = styled.div`
  padding: 10px 1rem;
  animation: ${activeMenu} 0.25s linear;
  font-family: "Open Sans", sans-serif;
  & > .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .logo {
      display: flex;
      align-items: center;
      & > .logo_link {
        background: url("https://www.popsockets.com/on/demandware.static/Sites-AMER-Site/-/en_US/v1667797420334/images/logo.svg")
          no-repeat center;
        background-size: contain;
        width: 210px;
        height: 60px;
        display: block;
      }
    }
  }
  & > .menu {
    padding: 10px 2rem;
    display: flex;
    flex-direction: column;
    margin: 0;
    gap: 1rem;
    & > li {
      background-color: #f9f9f9;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-radius: 1rem;
      cursor: pointer;
      & > a {
        text-decoration: none;
        color: #181818;
      }
      & > .image {
        width: 75px;
        height: 75px;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  & > .support-and-category {
    padding: 10px 2rem;
    & > .category,
    & > .support {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      padding: 1rem;
      border-top: 1px solid #f9f9f9;
      & > a {
        text-decoration: none;
        color: #181818;
      }
    }
    & > .category {
      & > .sign-in {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        & > a {
          text-decoration: none;
          color: #181818;
        }
      }
      & > .account {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        color: #181818;
        & > .title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        & > .container {
          margin: 0;
          padding: 0;
          & > li {
            list-style: none;
            margin-top: 1rem;
            padding: 1rem 0;
            border-top: 1px solid #f9f9f9;
            cursor: pointer;
            transition: all 0.5s ease-in-out;
            & > a {
              text-decoration: none;
              color: #181818;
              font-family: "Open Sans", sans-serif;
              transition: all 0.5s ease-in-out;
            }
          }
          & > li.my-profile {
            border: none;
          }
          & > li:hover > a {
            text-decoration: underline;
          }
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    & {
      display: none;
    }
  }
`;

const MenuActive = ({ sideBar, setSideBar, menuItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogined, user } = useSelector((state) => state.users);
  function handleCLickSignIn() {
    setSideBar(false);
    navigate("/login");
  }
  async function handleClickSignOut() {
    dispatch(logout());
    setSideBar(false);
    navigate("/new");
  }
  function handleClickToProfile() {
    setSideBar(false);
    navigate("/profile");
  }
  return (
    <StyleMenuActive className="menu active" sideBar={sideBar}>
      <div className="container">
        <Logo />
        <div className="close-menu">
          <IconButton
            aria-label="Example"
            onClick={() => {
              setSideBar(false);
            }}
          >
            <ClearIcon style={{ color: "#181818" }} />
          </IconButton>
        </div>
      </div>
      <ul className="menu">
        {menuItem.length > 0 &&
          menuItem.map((item, index) => {
            const { name, arrayItems } = item;
            return (
              <li key={index}>
                <Link
                  to={`/${name}`}
                  onClick={() => {
                    setSideBar(false);
                  }}
                >
                  {name}
                </Link>
                {arrayItems.length > 0 ? (
                  <div className="image">
                    <img src={arrayItems[0].image} alt="" />
                  </div>
                ) : (
                  <div className="image"></div>
                )}
              </li>
            );
          })}
        <li key={menuItem.length}>
          <Link>More</Link>
          <div className="image">
            <img
              src="https://www.popsockets.com/on/demandware.static/-/Sites-amer-storefront-catalog/default/dwe14fdd6e/categories/thumbnails/more-cupholder-75x75.png"
              alt=""
            />
          </div>
        </li>
      </ul>
      <div className="support-and-category">
        <div className="support">
          <Link>Support</Link>
        </div>
        <div className="category">
          {isLogined ? (
            <div className="account">
              <div className="title">
                <PersonOutlineIcon />
                <span>Hi, {user.last_name}</span>
              </div>
              <ul className="container">
                <li
                  className="my-profile"
                  onClick={() => {
                    handleClickToProfile();
                  }}
                >
                  <Link>My Profile</Link>
                </li>
                <li className="order-history">
                  <Link>Order History</Link>
                </li>
                <li className="Address">
                  <Link>Address Book</Link>
                </li>
                <li className="payment">
                  <Link>Payment</Link>
                </li>
                <li className="preferences">
                  <Link>Preferences</Link>
                </li>
                <li
                  className="sign-out"
                  onClick={() => {
                    handleClickSignOut();
                  }}
                >
                  <Link>Sign Out</Link>
                </li>
              </ul>
            </div>
          ) : (
            <div
              className="sign-in"
              onClick={() => {
                handleCLickSignIn();
              }}
            >
              <PersonOutlineIcon />
              <Link>Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </StyleMenuActive>
  );
};

export default MenuActive;
