import styled from "styled-components";
import FormCreateAccount from "../form-createAccount/form-createAccount";
import FormCheckOrder from "../form-checkOrder/form-checkOrder";
import { useNavigate, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
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
const CreateAccountUi = ({ activeSearch }) => {
  const navigate = useNavigate();
  const { isLogined } = useSelector((state) => state.users);
  function handelClickLogIn() {
    navigate("/login");
  }
  return (
    <>
      {isLogined ? (
        <Navigate to="/new" />
      ) : (
        <StylePageLoginAndCreateAcc
          className="main"
          style={{
            marginTop: "7rem",
            padding: "10px 2rem",
            display: `${activeSearch ? "none" : "block"}`,
          }}
        >
          <h3 className="title">Create Account</h3>
          <div className="container login">
            <div className="forms">
              <div className="header-line">
                <>
                  <h3 onClick={() => handelClickLogIn()}>Login</h3>
                  <h3 className="active">Create Account</h3>
                </>
              </div>
              <FormCreateAccount />
            </div>
            <div className="check-order">
              <div className="header-line">
                <h3>Check order</h3>
              </div>
              <div className="description">
                <p>
                  See your order even if you are not a registered user. Enter
                  the order number and the billing address ZIP code.
                </p>
              </div>
              <FormCheckOrder />
            </div>
          </div>
        </StylePageLoginAndCreateAcc>
      )}
    </>
  );
};
export default CreateAccountUi;
