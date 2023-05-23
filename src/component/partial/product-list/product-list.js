/* eslint-disable no-unused-vars */
// import useProductList from '../../../../hook/useProductList';
import ProductCard from "../product-card/product-card";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import SkeletonUi from "../../UI/skeleton/skeleton";
const StyleProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 1rem;
  margin-top: 5rem;
  @media screen and (max-width: 545px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const StyleSkeleton = styled.div`
  & > .skeleton {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    justify-content: center;
    margin-top: 50px;
    & > div > div > span.Skeleton-image {
      height: 350px;
    }
  }
  @media screen and (max-width: 768px) {
    & > .skeleton > div > div > span.Skeleton-image {
      height: 200px;
    }
  }
  @media screen and (max-width: 545px) {
    & > .skeleton {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
const ProductList = ({ viewSize, products, ...props }) => {
  const { productsSearch, loading } = useSelector((state) => {
    return state.products;
  });
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    if (products) {
      if (productsSearch.length > 0) {
        setNewData(productsSearch.slice(0, viewSize));
      } else {
        setNewData(products.slice(0, viewSize));
      }
    }
  }, [products, productsSearch, viewSize]);
  function renderLoading() {
    return (
      <StyleSkeleton>
        <Box className="skeleton">
          {[...Array.from(Array(16))].map((item, index) => {
            return <SkeletonUi key={index + 1} />;
          })}
        </Box>
      </StyleSkeleton>
    );
  }
  return (
    <>
      {loading ? (
        renderLoading()
      ) : (
        <StyleProducts>
          {newData &&
            newData.map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })}
        </StyleProducts>
      )}
    </>
  );
};
export default ProductList;
