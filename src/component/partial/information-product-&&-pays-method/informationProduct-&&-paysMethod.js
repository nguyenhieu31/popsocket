/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ProductPopularAddOns from "../../UI/product-popular-addOns/product-popular-addOns";
import MainContentProduct from "../../UI/main-content-product/main-content-product";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getProductInCartByUser } from "../../../redux/users/users";
const ListImgaeSlider = styled.div`
  width: max-content;
  overflow: hidden;
  overflow-y: scroll;
  & > ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: max-content;
    max-height: 550px;
    margin: 0;
  }
  &::-webkit-scrollbar {
    width: 6px;
    background-color: none;
  }
  ul > li {
    list-style: none;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 10px;
    cursor: pointer;
    img {
      width: 70px;
      height: 70px;
    }
  }
`;
const ImageDisplay = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  position: relative;
  & > img {
    width: 100%;
  }
  & > svg {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    font-size: 2rem;
    cursor: pointer;
  }
  & > .arrow-back {
    left: 0;
  }
  & > .arrow-forward {
    right: 0;
  }
`;
const StylePaysMethod = styled.div`
  font-family: "Open Sans", sans-serif;
  color: #181818;
  overflow-y: scroll;
  padding: 0 1rem;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: none;
  }
  & > .scroll-bar {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-height: 550px;
    & > .price-product,
    & > .name-product {
      margin: 0;
    }
    & > .evaluate > svg {
      font-size: 1.2rem;
      color: #181818a3;
    }
    & > .promotions,
    & > .add-to-cart {
      padding: 15px;
      text-align: center;
      background-color: #ff9244;
      border-radius: 1.5rem;
      cursor: pointer;
      font-weight: bold;
      transform: scale(1);
      transition: all 0.1s linear;
    }
    & > .add-to-cart:hover {
      transform: scale(1.01);
    }
    & > .promotions {
      background-color: #f9f9f9;
      color: #2867ec;
      cursor: auto;
    }
    & > .endow {
      width: 100%;
      font-size: 1rem;
      & > span > img {
        width: 60px;
      }
    }
    & > .popular-addOns {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      & > .product-popular {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border: 1px solid #d4d4d4;
        border-radius: 20px;
        gap: 1rem;
        position: relative;
        & > .card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          & > .card-left {
            display: flex;
            align-items: center;
            gap: 10px;
            & > .card-image {
              width: 110px;
              height: 110px;
              cursor: pointer;
              transition: all 0.1s ease-in-out;
            }
          }
          & > .card-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            gap: 1rem;
            font-size: 1.1rem;
            font-weight: bold;
            & > .card-price {
              margin: 0;
            }
            & > .card-addToCart {
              padding: 8px 1rem;
              border: 1px solid #181818;
              border-radius: 2rem;
              cursor: pointer;
              transform: scale(1);
              transition: all 0.1s ease-in-out;
            }
            & > .card-addToCart:hover {
              transform: scale(1.05);
            }
          }
        }
      }
      & > .product-popular::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #d4d4d4;
        top: 50%;
        left: 0;
      }
    }
    & > .description {
      font-size: 1.1rem;
    }
  }
`;
const StyleUserManual = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: "Open Sans", sans-serif;
  color: #181818;
  & > .card {
    display: flex;
    gap: 2rem;
    & > .card-image {
      width: 70px;
      height: 70px;
    }
    & > .card-content {
      & > .card-title {
        margin: 0 0 1rem 0;
      }
    }
  }
`;
const ResDisplayProduct = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 5.5fr 4.5fr;
  gap: 2rem;
  & > .information-product {
    display: grid;
    grid-template-columns: 1fr 8fr;
  }
  @media screen and (max-width: 1024px) {
    & > .information-product > .image-display {
      height: max-content;
    }
    & > .information-product > .list-images {
      height: max-content;
      & > ul {
        max-height: 300px;
      }
    }
    & > .pays-method > .scroll-bar {
      & > .popular-addOns {
        display: none;
      }
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    & > .information-product {
      display: block;
      & > .list-images {
        display: none;
      }
    }
    & > .pays-method {
      overflow-y: initial;
      & > .scroll-bar {
        max-height: initial;
      }
    }
  }
  @media screen and (max-width: 545px) {
    & > .pays-method > .scroll-bar > h1 {
      font-size: 1.5rem;
    }
  }
`;
const InformationProductAndPaysMethod = ({
  productDetail,
  loading,
  listImage,
  ...props
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user) {
      dispatch(getProductInCartByUser(user));
    }
  }, [dispatch]);
  const { name, price } = productDetail;
  const [locationImage, setLocationImage] = useState(0);
  function handelButtonNextDirection() {
    setLocationImage(locationImage + 1);
  }
  function handelButtonPrevDirection() {
    setLocationImage(locationImage - 1);
  }
  function handelClickImage(index) {
    setLocationImage(index);
  }
  function handelAddToCart() {
    if (user) {
      const newProductDetail = { ...productDetail, idUser: user.id };
      dispatch(addToCart(newProductDetail));
    }
  }
  const PopularAddOns = [
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw0e79d4c7/images/hi-res/QRX-MagSafe_Clear_Clear_01A_Front.png?sw=400&sh=400",
      behindImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw78e1ae50/images/hi-res/QRX-MagSafe_Clear_Clear_03A_Expanded.png?sw=400&sh=400",
      name: "PopGrip for MagSafe Clear",
      prices: [30],
      id: 1,
    },
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dwe77c0bd7/images/hi-res/800497_0.png?sw=400&sh=400",
      behindImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw2b4920d9/images/hi-res/800497_1.png?sw=400&sh=400",
      name: "Mimi",
      prices: [15, 17],
      id: 2,
    },
  ];
  const UserManual = [
    {
      image:
        "https://www.popsockets.com/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dwaf8279e6/images/pdp/product-icons/popgrip-swappable.png",
      title: "Swap Your Top",
      description:
        "Easily switch or repositon your grip's top to chance its style of function",
    },
    {
      image:
        "https://www.popsockets.com/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dw7e227a4c/images/pdp/product-icons/popgrip-stand.png",
      title: "Grip & Stand Your Phone",
      description:
        "Text with one hand, snap with friends, and watch videos hands-free",
    },
    {
      image:
        "https://www.popsockets.com/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dw31ca4dfd/images/pdp/product-icons/popmount-dash-and-windshield-mounts-to-desk.png",
      title: "Mount Compatible",
      description:
        "Just snap your grip into a PopSockets mount to use your phone hands-free",
    },
  ];
  return (
    <ResDisplayProduct className="information-product_and_pays-method">
      <div className="information-product">
        <ListImgaeSlider className="list-images">
          <ul>
            {loading
              ? ""
              : listImage.map((itemImage, index) => {
                  return (
                    <li
                      className="item"
                      data-index={index}
                      key={index + 1}
                      onClick={() => {
                        handelClickImage(index);
                      }}
                    >
                      <img src={itemImage} alt="" />
                    </li>
                  );
                })}
          </ul>
        </ListImgaeSlider>
        <ImageDisplay className="image-display">
          <img
            src={listImage[locationImage]}
            data-index={locationImage}
            alt=""
          />
          {locationImage === 0 ? (
            ""
          ) : (
            <ArrowBackIosNewIcon
              className="arrow-back"
              onClick={() => {
                handelButtonPrevDirection();
              }}
            />
          )}
          {locationImage === listImage.length - 1 ? (
            ""
          ) : (
            <ArrowForwardIosIcon
              className="arrow-forward"
              onClick={() => {
                handelButtonNextDirection();
              }}
            />
          )}
        </ImageDisplay>
      </div>
      <StylePaysMethod className="pays-method">
        <div className="scroll-bar">
          <h1 className="name-product">{name}</h1>
          <div className="evaluate">
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
            <StarBorderIcon />
          </div>
          <h4 className="price-product">${price}.00</h4>
          <div className="add-to-cart" onClick={() => handelAddToCart()}>
            <span>Add To Cart</span>
          </div>
          <div className="promotions">
            <span>Free Shipping on Orders $40+</span>
          </div>
          <div className="endow">
            <span>
              Pay over time with 4 payments using either{" "}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt=""
              />{" "}
              Or{" "}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Klarna_Logo_black.svg"
                alt=""
              />
            </span>
          </div>
          <div className="popular-addOns">
            <h4 className="title">Popular AddOns</h4>
            <div className="product-popular">
              {PopularAddOns.map((product, index) => {
                return (
                  <ProductPopularAddOns
                    product={product}
                    keyIndex={index}
                    key={index + 1}
                  />
                );
              })}
            </div>
          </div>
          <div className="description">
            <p>
              Get your phone in peppermint condition with Disney's Mickey Mouse.
            </p>
          </div>
          <StyleUserManual className="user-manual">
            {UserManual.map((item, index) => {
              const { image, title, description } = item;
              return (
                <div className="card" key={index + 1}>
                  <img className="card-image" src={image} alt="" />
                  <div className="card-content">
                    <h4 className="card-title">{title}</h4>
                    <span className="card-description">{description}</span>
                  </div>
                </div>
              );
            })}
          </StyleUserManual>
          <MainContentProduct />
        </div>
      </StylePaysMethod>
    </ResDisplayProduct>
  );
};
export default InformationProductAndPaysMethod;
