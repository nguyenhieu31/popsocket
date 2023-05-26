import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../../redux/users/users";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/users/users";
import Cookies from "js-cookie";
const StyleFormLogin = styled.div`
  margin-top: 1.5rem;
  & > form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    & > button {
      background-color: #181818;
      color: #ffffff;
      border-radius: 1rem;
      transform: scale(1);
      transition: all 0.3s ease-in-out;
    }
    & > button:hover {
      background-color: #444141f5;
      transform: scale(1.01);
    }
    & > .remember-forgotPassword {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > a {
        color: #181818;
        transition: all 0.2s ease-in-out;
      }
      & > a:hover {
        color: #181818ab;
      }
    }
    & > .btn-login {
      padding: 6px 1rem;
      border: 1px solid #181818;
      border-radius: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease-in-out;
      transform: scale(1);
    }
    & > .btn-login:hover {
      transform: scale(1.01);
    }
    & > .password {
      position: relative;
      & > .icon-eye {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
  }
`;
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values) {
        dispatch(getUser(values));
        setTimeout(() => {
          const token = Cookies.get("token");
          if (token) {
            dispatch(loginSuccess());
          }
          navigate("/new");
        }, 1500);
      }
    },
  });
  const [openPassword, setOpenPassword] = useState(false);
  return (
    <StyleFormLogin className="form-login">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <div className="password">
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={openPassword ? "text" : "password"}
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
        <div className="remember-forgotPassword">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox style={{ color: "#181818" }} />}
              label="Remember me"
            />
          </FormGroup>
          <Link>
            <span>forgot password?</span>
          </Link>
        </div>
        <Button variant="contained" fullWidth type="submit">
          Login
        </Button>
        <div className="btn-login login-by-google">
          <GoogleIcon />
          <span>Login With Google</span>
          {/* <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          /> */}
        </div>
        <div className="btn-login login-by-facebook">
          <FacebookIcon />
          <span>Login With Facebook</span>
        </div>
      </form>
    </StyleFormLogin>
  );
};
export default FormLogin;
