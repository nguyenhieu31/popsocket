import { useState } from "react";
import React from "react";
const ProductRecommendCard = ({ product, keyIndex, ...props }) => {
  const [isHoverImage, setIsHoverImage] = useState(false);
  const { frontImage, behindImage, name, priceNew, priceOld } = product;
  return (
    <div className="product" key={keyIndex}>
      <div className="image-product">
        <img
          src={isHoverImage ? behindImage : frontImage}
          alt={name}
          onMouseOver={() => {
            if (behindImage) {
              setIsHoverImage(true);
            }
          }}
          onMouseOut={() => {
            setIsHoverImage(false);
          }}
        />
      </div>
      <div className="body">
        <span className="name-product">{name}</span>
        <div className="price">
          <span className="price-new">${priceNew}</span>
          <span className="price-old">${priceOld}</span>
        </div>
      </div>
    </div>
  );
};
export default ProductRecommendCard;
