import React, { useState } from "react";
const ProductPopularAddOns = ({ product, keyIndex, ...props }) => {
  const [isHoverImage, setIsHoverImage] = useState(false);
  const { frontImage, behindImage, name, prices } = product;
  var count = prices.length;
  return (
    <div className="card">
      <div className="card-left">
        <img
          className={`card-image image-${keyIndex}`}
          src={isHoverImage ? behindImage : frontImage}
          alt=""
          onMouseOver={() => {
            setIsHoverImage(true);
          }}
          onMouseOut={() => {
            setIsHoverImage(false);
          }}
        />
        <span className="card-name">{name}</span>
      </div>
      <div className="card-right">
        <h4 className="card-price">
          {prices.map((price, index) => {
            if (prices.length <= 1) {
              return `$${price}.00`;
            } else {
              let str = "";
              while (count > 0) {
                str += `$${price}.00`;
                if (count > 1) {
                  str += " - ";
                }
                count--;
                break;
              }
              return str;
            }
          })}
        </h4>
        <div className="card-addToCart">
          <span>Add To Cart</span>
        </div>
      </div>
    </div>
  );
};
export default ProductPopularAddOns;
