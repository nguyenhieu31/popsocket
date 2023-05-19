import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LockIcon from "@mui/icons-material/Lock";
import React, { useState, useEffect } from "react";
import {
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
  getProductInCartByUser,
} from "../../../redux/users/users";
import ProductMayAlsoLike from "../../UI/productMayAlsoLike/product-may-also-like";
import { toast } from "react-toastify";
const CartStyle = styled.div`
  font-family: 'Open Sans', sans-serif;
  color: #181818;
  &>h1{
    font-weight: revert;
  }
  &>.container{
    display: grid;
    grid-template-columns: 57% 43%;
    gap: 1.5rem;
    &>.box-left{
      &>a{
        color: #181818;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        font-size: 0.9rem;
      }
      &>a:hover{
        color: #1818189e;
      }
      &>.list-cart{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem 0;
        &>.cart-item{
          display: flex;
          justify-content: space-between;
          border-radius: 1rem;
          background-color: #F9F9F9;
          padding: 1rem;
          &>.cart-item-left{
            display: flex;
            gap: 1rem;
            &>.image{
              width: 30%;
              &>img{
                width: 100%;
                height: 100%;
              }
            }
            &>.content{
              &>h3{
                font-size: 0.9rem;
                font-weight: bold;
              }
              &>.increase-decrease-quantity{
                display: flex;
                align-items: center;
                gap: 10px;
                &>.quantity{
                  color: red;
                  font-size: 1.2rem;
                  font-weight: bold;
                }
              }
            }
          }
          &>.cart-item-right{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            &>svg{
              cursor: pointer;
              transition: all 0.1s ease-in-out;
            }
            &>svg:hover{
              color: red;
            }
          }
        }
      }
    }
    &>.box-right{
      &>.support{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        margin: 0;
        font-size: 0.9rem;
      }
      &>div{
        margin : 1rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        &>.standard-shipping{
          padding: 1rem;
          background-color: #f9f9f9;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          &>.header-line{
            display: flex;
            align-items: center;
            gap: 0.5rem;
            &>.logo-congratulation{
              background-image: url('https://www.popsockets.com/on/demandware.static/Sites-AMER-Site/-/en_US/v1669784647227/images/icon-congrats.svg');
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              width: 30px;
              height: 30px;
            }
          }
          &>.tab-congrats{
            width: 100%;
            height: 10px;
            border-radius: 2rem;
            background-color: #00d959;
          }
        }
        &>.promo-code{
          background-color: #f9f9f9;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          padding: 1rem;
          &>.promo-header{
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            &>h3{
              margin: 0;
            }
          }
          &>.input-promo{
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1rem;
            &>input{
              padding: 12px;
              border-radius: 0.5rem;
              border: 1px solid #D4D4D4;
            }
            &>.submit{
              margin-top: 1rem;
              &>a{
                text-decoration: none;
                transition: all 0.3s ease-in-out;
                color: #181818;
                &>span{
                  padding: 10px 1.5rem;
                  border: 1px solid #181818;
                  border-radius: 2rem;
                }
              }
              &>a:hover{
                text-decoration: underline;
              }
            }
          }
        }
        &>.pay-money{
          padding: 2rem 1rem 1rem;
          background-color: #f9f9f9;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          &>.form-control{
            padding: 1rem;
            border: 1px solid #D4D4D4;
            border-radius: 0.5rem;
          }
          &>.order-summary{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            &>div{
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px 0;
            }
            &>.estimated-total{
              margin-top: 10px;
              border-top: 1px solid #D4D4D4;
              padding: 1rem 0;
              font-weight: bold;
            }
          }
          &>.btn-pay-money{
            &>.paypal,
            &>.checkout{
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 1rem;
              padding: 0.8rem;
              background-color: #ff9244;
              cursor: pointer;
              border-radius: 2rem;
            }
            &>.paypal{
              margin-top: 10px;
              background-color: #ffffff;
              &>img{
                width: 69px;
                height: 22px;
              }
            }
          }
        }
      }
    }
  }
  &>.body-text{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    font-size: 1.2rem;
    &>a{
      color: #181818;
    }
    &>h3{
      font-weight: bold;
    }
  }
  &>.product-may-also-like{
    margin-top: 7rem;
    &>h3{
      font-size: 2rem;
      font-weight: revert;
      margin: 0 0 1rem 0;
    }
    &>.products{
      width: 100%;
      &>.scroll-bar{
        display: flex;
        flex-wrap: nowrap;
        gap: 1rem;
      }
    }
  }
  @media screen and (max-width: 768px){
    &>.container{
      display: flex;
      flex-direction: column;
    }
    &>.product-may-also-like{
      &>.products{
        overflow: hidden;
        overflow-x: scroll;
        scroll-behavior: smooth;
        &>.scroll-bar{
          min-width: 200%;
        }
        &::-webkit-scrollbar {
          width: 6px;
          background-color: none;
        }
      }
    }
  }
  @media screen and (max-width: 545px){
    &>.container>.box-left>.list-cart>.cart-item>.cart-item-left>.image{
      width: 100%;
    }
    &>.container>.box-right>.wrapper>.pay-money>.btn-pay-money>.checkout{
      position: fixed;
      border-radius: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
      &>span{
        background-color: #ff9244;
        padding: 1rem 8rem;
        border-radius: 4rem;
      }
    }
    &>.body-text{
      font-size: 0.9rem;
    }
    &>.product-may-also-like{
      &>.products>.scroll-bar{
        min-width: 350%;
      }
  }
`;
const CartUi = () => {
  const dispatch = useDispatch();
  const [isClick, setIsClick] = useState(false);
  const productList = [
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw0e79d4c7/images/hi-res/QRX-MagSafe_Clear_Clear_01A_Front.png?sw=400&sh=400",
      behindImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw78e1ae50/images/hi-res/QRX-MagSafe_Clear_Clear_03A_Expanded.png?sw=400&sh=400",
      name: "PopGrip for MagSafe Clear",
      price: [30],
    },
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dwc2ba3c8f/images/hi-res/MagSafe-Thunder_Black_01A_Front.png?sw=400&sh=400",
      behindImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dwd4468dd0/images/hi-res/MagSafe-Thunder_Black_01B_Front-Device.png?sw=400&sh=400",
      name: "Anker MagGo Black",
      price: [70],
    },
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw9f7fa674/images/hi-res/Enamel_Fly-Me-To-The-Moon_01_Top-View.png?sw=400&sh=400",
      behindImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw53c429cb/images/hi-res/Enamel_Fly-Me-To-The-Moon_02_Grip-Expanded.png?sw=400&sh=400",
      name: "Enamel Fly Me To The Moon",
      price: [15, 17],
    },
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw8b6f7764/images/hi-res/PopPuck_Black-Flip_01_Front.png?sw=400&sh=400",
      behindImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw09eacb2d/images/hi-res/PopPuck_Black-Flip_02_Back-Open.png?sw=400&sh=400",
      name: "PopPuck Starter Pack Black Flip",
      price: [16],
    },
  ];
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(getProductInCartByUser(user.id));
    }
  }, [dispatch]);
  const { isLogined, cart } = useSelector((state) => state.users);
  function handelClickPromoCode() {
    if (isClick) {
      setIsClick(false);
    } else {
      setIsClick(true);
    }
  }
  function handelClickDecreaseQuantity(item) {
    dispatch(decrementCartItem(item));
  }
  function handelClickIncreaseQuantity(item) {
    dispatch(incrementCartItem(item));
  }
  function handelDeleteCartItem(item) {
    dispatch(deleteCartItem(item));
  }
  function handelClickCheckout() {
    if (!isLogined) {
      toast.error("You must be logged in");
    } else {
      toast.success("Checkout success");
    }
  }
  return (
    <CartStyle style={{ padding: "10px 2rem", marginTop: "7rem" }}>
      <h1 className="title">Your Cart</h1>
      <div className="container">
        <div className="box-left">
          <Link to="/new">
            <span className="continue-shopping">Continue Shopping</span>
          </Link>
          <div className="list-cart">
            {cart && cart.length > 0 ? (
              cart.map((item, index) => {
                const { front_thumbnail, name, price, quantity } = item;
                return (
                  <div className="cart-item" key={index + 1}>
                    <div className="cart-item-left">
                      <div className="image">
                        <img src={front_thumbnail} alt="" />
                      </div>
                      <div className="content">
                        <h3 className="cart-item-name">{name}</h3>
                        <div className="increase-decrease-quantity">
                          <IconButton
                            onClick={() => {
                              handelClickDecreaseQuantity(item);
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <span className="quantity">{quantity}</span>
                          <IconButton
                            onClick={() => {
                              handelClickIncreaseQuantity(item);
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-right">
                      <ClearIcon
                        onClick={() => {
                          handelDeleteCartItem(item);
                        }}
                      />
                      <span className="price">${price}.00</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Your Cart Is Empty</h1>
            )}
          </div>
        </div>
        <div className="box-right">
          <div className="support">
            <span className="quantity">
              {cart &&
                cart.reduce((sum, item) => {
                  return sum + item.quantity;
                }, 0)}{" "}
              Items
            </span>
            <div>
              <span>Need Help?</span>
              <span style={{ cursor: "pointer" }}> Chat Now</span>
            </div>
          </div>
          <div className="wrapper">
            <div className="standard-shipping">
              <div className="header-line">
                <div className="logo-congratulation"></div>
                <span className="text">
                  Congrats! You get free standard shipping
                </span>
              </div>
              <div className="tab-congrats"></div>
              <div className="condition-congrats">
                <span>Free Shipping on Orders $40+</span>
              </div>
            </div>
            <div className="promo-code">
              <div
                className="promo-header"
                onClick={() => {
                  handelClickPromoCode();
                }}
              >
                <h3>Promo Codes</h3>
                {isClick ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </div>
              {isClick ? (
                <div className="input-promo">
                  <label htmlFor="code" style={{ cursor: "pointer" }}>
                    Enter Promo Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Promo Code"
                  />
                  <div className="submit">
                    <Link>
                      <span>Submit</span>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="pay-money">
              <span className="header-line">Shipping</span>
              <select className="form-control">
                <option>
                  DHL standard Ground Shipping - Carbon Neutral (3-5 Business
                  Days)
                </option>
                <option>First Class USPS (4-6 Business Days)</option>
                <option>
                  UPS expedited Shipping (2-3 Business Days Next Business Days
                  Delivery for Order Placed Before 11am MST)
                </option>
              </select>
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div>
                  <span className="text">Subtotal</span>
                  <span className="price">
                    $
                    {cart &&
                      cart.reduce((sum, item) => {
                        return sum + item.quantity * item.price;
                      }, 0)}
                    .00
                  </span>
                </div>
                <div>
                  <span className="text">Shipping Cost</span>
                  <span className="price">Free</span>
                </div>
                <div>
                  <span className="text">Sales Tax</span>
                  <span className="price">$0.00</span>
                </div>
                <div className="estimated-total">
                  <span className="text">Estimated Total</span>
                  <span className="price">
                    $
                    {cart &&
                      cart.reduce((sum, item) => {
                        return sum + item.quantity * item.price;
                      }, 0)}
                    .00
                  </span>
                </div>
              </div>
              <div className="btn-pay-money">
                <div
                  className="checkout"
                  onClick={() => {
                    handelClickCheckout();
                  }}
                >
                  {isLogined ? (
                    <span>Checkout</span>
                  ) : (
                    <>
                      <LockIcon />
                      <span>Checkout</span>
                    </>
                  )}
                </div>
                <div className="paypal">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
                    data-v-b01da731=""
                    alt=""
                    role="presentation"
                    className="paypal-logo paypal-logo-paypal paypal-logo-color-blue"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body-text">
        <h3>Not Seeing What You're Looking For?</h3>
        <Link>
          <span>Visit the regional site.</span>
        </Link>
      </div>
      <div className="product-may-also-like">
        <h3>You May Also Like</h3>
        <div className="products">
          <div className="scroll-bar">
            {productList.map((product, index) => {
              return <ProductMayAlsoLike product={product} key={index} />;
            })}
          </div>
        </div>
      </div>
    </CartStyle>
  );
};
export default CartUi;
