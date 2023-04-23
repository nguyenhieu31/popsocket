/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ExperienceRegion from "../../UI/experience-region/experience-region";
import ExperienceCommerce from "../../UI/experience-commerce/experience-commerce";
import InformationProductAndPaysMethod from "../information-product-&&-pays-method/informationProduct-&&-paysMethod";
import Feedback from "../../UI/feedback/feedback";
import ProductRecommend from "../../UI/product-recommend/product-recommend";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductDetail,
  deleteDataProduct,
} from "../../../redux/product-details/product-details";
const NavigateStyle = styled.a`
  font-family: "Open Sans", sans-serif;
  & > div {
    text-decoration: none;
    font-size: 0.8rem;
    color: #181818;
    cursor: pointer;
    width: max-content;
  }
  & > div:hover {
    text-decoration: underline;
  }
`;
const ProductDetailUi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetailItem, loading, listImage } = useSelector((state) => {
    return state.productDetail;
  });
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, [id]);
  function handelClickPrev() {
    navigate(-1);
  }
  return (
    <>
      <NavigateStyle>
        <div
          onClick={() => {
            handelClickPrev();
          }}
        >
          <span className="text">New</span>
        </div>
      </NavigateStyle>
      {productDetailItem ? (
        <InformationProductAndPaysMethod
          productDetail={productDetailItem}
          loading={loading}
          listImage={listImage}
        />
      ) : null}
      <ExperienceRegion />
      <ExperienceCommerce />
      <Feedback />
      <ProductRecommend />
    </>
  );
};
export default ProductDetailUi;
