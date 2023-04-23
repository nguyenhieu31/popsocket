import styled from "styled-components";
import FormLogin from "../form-login/form-login";
import FormCheckOrder from "../form-checkOrder/form-checkOrder";
import React from "react";
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
const StylePageLoginAndCreateAcc = styled.div`
  font-family: "Open Sans", sans-serif;
  color: #181818;
  & > .title {
    font-size: 2rem;
    font-weight: revert;
  }
  & > .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    & > .check-order,
    & > .forms {
      background-color: #f9f9f9;
      padding: 1rem;
      border-radius: 1rem;
      & > .header-line {
        display: flex;
        align-items: center;
        justify-content: space-around;
        & > h3 {
          cursor: pointer;
          color: #595959;
        }
        & > h3.active {
          color: #181818;
        }
      }
    }
    & > .check-order {
      height: max-content;
    }
    & > .check-order > .header-line {
      justify-content: flex-start;
      & > h3 {
        color: #181818;
      }
    }
  }
  @media screen and (max-width: 545px) {
    & > .container {
      display: flex;
      flex-direction: column;
    }
  }
`;
const LoginUi = ({ activeSearch }) => {
  const navigate = useNavigate();
  function handelClickCreateAcc() {
    navigate("/createAccount");
  }
  return (
    <StylePageLoginAndCreateAcc
      className="main"
      style={{
        marginTop: "7rem",
        padding: "10px 2rem",
        display: `${activeSearch ? "none" : "block"}`,
      }}
    >
      <h3 className="title">Login</h3>
      <div className="container login">
        <div className="forms">
          <div className="header-line">
            <>
              <h3 className="active">Login</h3>
              <h3 onClick={() => handelClickCreateAcc()}>Create Account</h3>
            </>
          </div>
          <FormLogin />
        </div>
        <div className="check-order">
          <div className="header-line">
            <h3>Check order</h3>
          </div>
          <div className="description">
            <p>
              See your order even if you are not a registered user. Enter the
              order number and the billing address ZIP code.
            </p>
          </div>
          <FormCheckOrder />
        </div>
      </div>
    </StylePageLoginAndCreateAcc>
  );
};
export default LoginUi;
