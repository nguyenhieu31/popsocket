import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsers } from "../../../redux/users/users";
import { Link, useNavigate } from "react-router-dom";
const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .min(2, "First name must have min two characters")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .min(2, "First name must have min two characters")
    .required("Last name is required"),
  phone: yup
    .number()
    .min(9, "phone must have min 9 number")
    .required("phone is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
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
const FormCreateAccStyle = styled.div`
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
    & > .confirmPassword,
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
    & > .policy {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      & > a {
        color: #181818;
        transition: all 0.2s ease-in-out;
      }
      & > a:hover {
        color: #1818189e;
      }
    }
  }
`;
const FormCreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values) {
        dispatch(setUsers(values));
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    },
  });
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  return (
    <FormCreateAccStyle className="form-createAccount">
      <form onSubmit={formik.handleSubmit}>
        <div className="btn-login login-by-google">
          <GoogleIcon />
          <span>Login With Google</span>
        </div>
        <div className="btn-login login-by-facebook">
          <FacebookIcon />
          <span>Login With Facebook</span>
        </div>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
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
        <div className="confirmPassword">
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="confirmPassword"
            type={openConfirmPassword ? "text" : "password"}
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
        <div className="add-email-list">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox style={{ color: "#181818" }} defaultChecked />}
              label="Please add me to PopSockets email list"
            />
          </FormGroup>
        </div>
        <Button variant="contained" fullWidth type="submit">
          Create Account
        </Button>
        <div className="policy">
          <span>PopSockets does not share or sell personal info.</span>
          <Link>
            <span>See privacy policy</span>
          </Link>
        </div>
      </form>
    </FormCreateAccStyle>
  );
};
export default FormCreateAccount;
