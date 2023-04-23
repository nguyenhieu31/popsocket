import styled from "styled-components";
import ProductRecommendCard from "./product-recommend-card";
import React from "react";
const ProductRecStyle = styled.div`
  width: 100%;
  font-family: "Open Sans", sans-serif;
  color: #181818;
  & > h3 {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
  }
  & > .products {
    & > div {
      display: flex;
      gap: 3rem;
      width: 100%;
      & > .product {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        cursor: pointer;
        width: 300px;
        & > .image-product {
          width: 100%;
          & > img {
            width: 100%;
            background-color: #f9f9f9;
            border-radius: 1rem;
          }
        }
        & > .body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          & > .price {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            font-size: 1.1rem;
            font-weight: bold;
            & > .price-new {
              color: #a80b1d;
            }
            & > .price-old {
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    & > .products {
      overflow: hidden;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        width: 6px;
        background-color: none;
      }
    }
  }
`;
const ProductRecommend = () => {
  const productRecommend = [
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw7f3751ae/images/hi-res/Disney_Earridescent_Peppermint-Mickey_01_Top.png?sw=400&sh=400",
      behindImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw692deffc/images/hi-res/Disney_Earridescent_Peppermint-Mickey_02_Collapsed.png?sw=400&sh=400",
      name: "Disney Mickey Mouse Peppermint PopOut",
      priceNew: "20.00",
      priceOld: "25.00",
    },
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dwe77c0bd7/images/hi-res/800497_0.png?sw=400&sh=400",
      behindImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw2b4920d9/images/hi-res/800497_1.png?sw=400&sh=400",
      name: "Mimi",
      priceNew: "13.60",
      priceOld: "17.00",
    },
    {
      frontImage:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Sites-popsockets-master-catalog/default/dw0423157b/images/hi-res/cyo-product-image-grip.png?sw=400&sh=450",
      name: "Custom PopGrip",
      priceNew: "16.00",
      priceOld: "20.00",
    },
  ];
  return (
    <ProductRecStyle className="product-recommend">
      <h3 className="title">Product Recommendations</h3>
      <div className="products">
        <div className="scroll-x-w_600">
          {productRecommend.map((product, index) => {
            return (
              <ProductRecommendCard
                product={product}
                keyIndex={index}
                key={index + 1}
              />
            );
          })}
        </div>
      </div>
    </ProductRecStyle>
  );
};
export default ProductRecommend;
