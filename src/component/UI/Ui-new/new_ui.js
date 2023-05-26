/* eslint-disable no-unused-vars */
import TitleRender from "../title/title";
import ProductsOutstanding from "../../partial/product-outstanding/product-outstanding";
import ClassifyProducts from "../classify-product/classify-product";
import ProductList from "../../partial/product-list/product-list";
import { useDispatch, useSelector } from "react-redux";
import { getProductInCartByUser } from "../../../redux/users/users";
import { deleteDataProduct } from "../../../redux/product-details/product-details";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import styled from "styled-components";
import { getProducts } from "../../../redux/products/productSlice";
import CircularProgress from "@mui/material/CircularProgress";
import waiting from "../../../hooks/waiting";
const PagingStyle = styled.button`
  width: max-content;
  border: none;
  background-color: #000;
  cursor: pointer;
  padding: 15px;
  border-radius: 2rem;
  transform: scale(1);
  opacity: 1;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  & > span {
    font-size: 1.1rem;
    font-family: "Open Sans", sans-serif;
    color: #fff;
  }
  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;
const NewUi = ({ activeSearch }) => {
  const dispatch = useDispatch();
  const [viewSize, setViewSize] = useState(16);
  const { products, productsSearch } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const viewSizeRef = useRef(viewSize);
  const viewSearch = useMemo(() => {
    if (productsSearch.length > 0) {
      return `${
        viewSize < productsSearch.length ? viewSize : productsSearch.length
      }`;
    }
    return viewSize;
  }, [viewSize, productsSearch.length]);
  useEffect(() => {
    if (user && user.id) {
      dispatch(getProductInCartByUser(user.id));
    }
    Promise.all([dispatch(getProducts()), dispatch(deleteDataProduct())]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handelClickViewSize = useCallback(async () => {
    setLoading(true);
    await waiting(1500);
    setLoading(false);
    if (!(viewSizeRef.current === products.length)) {
      viewSizeRef.current += 16;
    }
    setViewSize(viewSizeRef.current);
  }, [products.length]);
  return (
    <div
      className="main"
      style={{
        padding: "10px 2rem",
        marginTop: "7rem",
        display: `${activeSearch ? "none" : "block"}`,
      }}
    >
      <TitleRender />
      <div className="body">
        <div
          className="productsOutstanding-and-classifyOfProducts"
          style={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            position: "relative",
          }}
        >
          <ProductsOutstanding />
          <ClassifyProducts />
        </div>
        <div id="ProductsList">
          <ProductList viewSize={viewSearch} products={products && products} />
        </div>
        <div
          className="paging"
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <span
            className="view-numbers"
            style={{
              fontSize: "1.1rem",
              fontFamily: "'Open Sans', sans-serif",
              color: "#181818",
            }}
          >
            Viewing{" "}
            {productsSearch.length > 0
              ? `${
                  viewSize < productsSearch.length
                    ? viewSize
                    : productsSearch.length
                }`
              : viewSize}{" "}
            of{" "}
            {productsSearch.length > 0
              ? productsSearch.length
              : products.length}
          </span>
          {loading ? (
            <PagingStyle
              className="view-text"
              onClick={() => {
                handelClickViewSize();
              }}
            >
              <span>View More Products</span>
              <CircularProgress style={{ fontSize: "0.7rem" }} />
            </PagingStyle>
          ) : (
            <PagingStyle
              className="view-text"
              onClick={() => {
                handelClickViewSize();
              }}
            >
              <span>View More Products</span>
            </PagingStyle>
          )}
        </div>
      </div>
    </div>
  );
};
export default NewUi;
