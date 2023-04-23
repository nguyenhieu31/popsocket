import styled from "styled-components";
import ProductType from "../../partial/product-type/product-type";
import ProductPrice from "../../partial/product-price/product-price";
import ProductCompatibility from "../../partial/product-compatibility/product-compatibility";
import SortProduct from "../../partial/sort-product/sort-product";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCategoryProduct } from "../../../redux/products/productSlice";
const ClassifyProducts = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  gap: 4rem;
  margin: 0;
  font-size: 14px;
  & > li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    h4 {
      margin: 0;
    }
    .section {
      display: flex;
      padding: 1rem 2rem;
      align-items: center;
      gap: 3rem;
      border-radius: 2rem;
      border: 1px solid transparent;
      font-size: 13px;
    }
    .section.active {
      border: 1px solid #000000;
    }
  }
`;
const Classify = () => {
  const dispatch = useDispatch();
  const [isClickProductType, setIsClickProductType] = useState(false);
  const [isClickProductPrice, setIsClickProductPrice] = useState(false);
  const [isClickProductCompatibility, setIsClickProductCompatibility] =
    useState(false);
  const [isClickSortProduct, setIsClickSortProduct] = useState(false);
  function handelClickProductType() {
    if (!isClickProductType) {
      dispatch(getCategoryProduct());
      setIsClickProductPrice(false);
      setIsClickProductCompatibility(false);
      setIsClickSortProduct(false);
      setIsClickProductType(true);
    } else {
      setIsClickProductType(false);
    }
  }
  function handelClickProductPrice() {
    if (!isClickProductPrice) {
      setIsClickProductCompatibility(false);
      setIsClickSortProduct(false);
      setIsClickProductType(false);
      setIsClickProductPrice(true);
    } else {
      setIsClickProductPrice(false);
    }
  }
  function handelClickProductCompatibility() {
    if (!isClickProductCompatibility) {
      setIsClickSortProduct(false);
      setIsClickProductType(false);
      setIsClickProductPrice(false);
      setIsClickProductCompatibility(true);
    } else {
      setIsClickProductCompatibility(false);
    }
  }
  function handelClickSortProduct() {
    if (!isClickSortProduct) {
      setIsClickProductType(false);
      setIsClickProductPrice(false);
      setIsClickProductCompatibility(false);
      setIsClickSortProduct(true);
    } else {
      setIsClickSortProduct(false);
    }
  }

  return (
    <ClassifyProducts className="classifyOfProducts">
      <li
        className="type"
        onClick={() => {
          handelClickProductType();
        }}
      >
        <ProductType isClickProductType={isClickProductType} />
      </li>
      <li
        className="price"
        onClick={() => {
          handelClickProductPrice();
        }}
      >
        <ProductPrice isClickProductPrice={isClickProductPrice} />
      </li>
      <li
        className="Compatibility"
        onClick={() => {
          handelClickProductCompatibility();
        }}
      >
        <ProductCompatibility
          isClickProductCompatibility={isClickProductCompatibility}
        />
      </li>
      <li
        className="sort"
        onClick={() => {
          handelClickSortProduct();
        }}
      >
        <SortProduct isClickSortProduct={isClickSortProduct} />
      </li>
    </ClassifyProducts>
  );
};
export default Classify;
