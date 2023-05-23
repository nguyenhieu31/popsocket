import ProductDetailUi from "../component/partial/ui-product-detail/ui-product-detail";
import React from "react";
const ProductDetailPage = ({ sideBar, activeSearch, ...props }) => {
  return (
    <div
      className="main"
      style={{
        padding: "10px 2rem",
        marginTop: "9rem",
        display: `${sideBar || activeSearch ? "none" : "block"}`,
      }}
    >
      {!sideBar && <ProductDetailUi />}
    </div>
  );
};
export default ProductDetailPage;
