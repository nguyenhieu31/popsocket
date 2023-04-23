import { useSelector } from "react-redux";
import React from "react";
const NumberProduct = () => {
  const { products, productsSearch } = useSelector((state) => state.products);
  return (
    <>
      {productsSearch.length > 0 ? (
        <span className="result-search">{productsSearch.length} Results</span>
      ) : (
        <span className="result-search">{products.length} Results</span>
      )}
    </>
  );
};
export default NumberProduct;
