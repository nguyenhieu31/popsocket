import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/users/users";
import { useNavigate } from "react-router-dom";
const ChangePasswordStyle = styled.div`
  margin-top: 7rem;
  padding: 1rem 2rem;
  & > .container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 350px;
    background-color: #f9f9f9;
    & > form {
      width: 500px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid rgb(235, 235, 240);
      background-color: #ffffff;
      & > div {
        position: relative;
        & > svg {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
      & > button {
        margin-top: 3rem;
        background-color: #181818;
        color: #ffffff;
      }
    }
  }
`;
const validationSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUser(data);
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values) {
        user.password = values.password;
        // user.confirmPassword = values.confirmPassword;
        dispatch(changePassword(user));
        setTimeout(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            navigate(-1);
          }
        }, 1500);
      }
    },
  });
  return (
    <ChangePasswordStyle>
      <h3 className="title">Set Up Password</h3>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              fullWidth
              type={openPassword ? "text" : "password"}
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {openPassword ? (
              <VisibilityIcon
                onClick={() => setOpenPassword(false)}
                className="icon-eye off"
              ></VisibilityIcon>
            ) : (
              <VisibilityOffIcon
                onClick={() => setOpenPassword(true)}
                className="icon-eye open"
              ></VisibilityOffIcon>
            )}
          </div>
          <div>
            <TextField
              fullWidth
              type={openConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              label="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            {openConfirmPassword ? (
              <VisibilityIcon
                onClick={() => setOpenConfirmPassword(false)}
                className="icon-eye off"
              ></VisibilityIcon>
            ) : (
              <VisibilityOffIcon
                onClick={() => setOpenConfirmPassword(true)}
                className="icon-eye open"
              ></VisibilityOffIcon>
            )}
          </div>
          <Button variant="contained" fullWidth type="submit">
            Save Change
          </Button>
        </form>
      </div>
    </ChangePasswordStyle>
  );
};
export default ChangePassword;
