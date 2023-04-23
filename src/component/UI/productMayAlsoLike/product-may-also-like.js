import styled from "styled-components";
import { useState } from "react";
import React from "react";
const ProductMayLikeStyle = styled.div`
  & > .product-image {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    border-radius: 1.5rem;
    cursor: pointer;
    & > img {
      width: 100%;
    }
  }
  & > .product-price {
    & > h3 {
      margin: 1rem 0 0 0;
      font-weight: revert;
    }
  }
`;
const ProductMayAlsoLike = ({ product, ...props }) => {
  const [isHoverImage, setIsHoverImage] = useState(false);
  const { frontImage, behindImage, name, price } = product;
  return (
    <ProductMayLikeStyle>
      <div className="product-image">
        <img
          src={isHoverImage ? behindImage : frontImage}
          onMouseOver={() => {
            setIsHoverImage(true);
          }}
          onMouseOut={() => {
            setIsHoverImage(false);
          }}
          alt={name}
        />
      </div>
      <div className="product-name">
        <span>{name}</span>
      </div>
      <div className="product-price">
        <h3>
          {price.map((item, index) => {
            if (price.length > 1) {
              if (price.length - 1 === index) {
                return `$${item}.00`;
              } else {
                return `$${item}.00 - `;
              }
            } else {
              return `$${item}.00`;
            }
          })}
        </h3>
      </div>
    </ProductMayLikeStyle>
  );
};
export default ProductMayAlsoLike;
