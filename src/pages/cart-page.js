import CartUi from "../component/UI/cart-ui/cart-ui";
import React from "react";
const CartPage = ({ sideBar, activeSearch }) => {
  return <>{!sideBar && <CartUi activeSearch={activeSearch} />}</>;
};
export default CartPage;
