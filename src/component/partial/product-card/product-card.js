// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDataProduct } from "../../../redux/product-details/product-details";
import { useDispatch } from "react-redux";
const ProductCard = ({ product, ...props }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handelMouseOverProduct() {
    setIsHover(true);
  }
  function handelMouseOutProduct() {
    setIsHover(false);
  }
  function getMedia() {
    if (!isHover) {
      return product.front_thumbnail;
    } else {
      return product.behind_thumbnail;
    }
  }
  function handelClickProduct(id) {
    dispatch(deleteDataProduct());
    navigate(`products/${id}`);
  }
  return (
    <>
      <div
        className="product-card"
        style={{ cursor: "pointer", maxHeight: "450px" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateRows: "repeat(2,1fr)",
          }}
          onClick={() => {
            handelClickProduct(product.id);
          }}
        >
          <div className="product-image" style={{ borderRadius: "2rem" }}>
            <img
              src={getMedia()}
              alt={`${product.name}`}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                backgroundColor: "#f4f4f4",
                borderRadius: "2rem",
              }}
              onMouseOver={() => {
                handelMouseOverProduct();
              }}
              onMouseOut={() => {
                handelMouseOutProduct();
              }}
            />
          </div>
          <div
            className="product-content"
            style={{
              color: "rgb(24, 24, 24)",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              className="product-name"
              style={{
                width: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  fontFamily: "'Open Sans', sans-serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                  width: "100%",
                }}
              >
                {product.name}
              </span>
            </div>
            <div className="product-price">
              <h3
                style={{
                  margin: "0",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                ${product.price}.00
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
