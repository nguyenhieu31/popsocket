import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import React from "react";
const validationSchema = yup.object({
  orderNumber: yup.number().required("Order number is required"),
  orderEmail: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  ZIPCode: yup
    .string("Enter your ZIP code")
    .min(8, "ZIP code should be of minimum 8 characters length")
    .required("ZIP code is required"),
});
const FormCheckOrderStyle = styled.div`
margin-top: 1.5rem;
&>form{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  &>button{
    background-color: #181818;
    color: #ffffff;
    border-radius: 1rem;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
  }
  &>button:hover{
    background-color: #444141f5;
    transform: scale(1.01);
  }
  &>.remember-forgotPassword{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>a{
      color: #181818;
      transition: all 0.2s ease-in-out;
    }
    &>a:hover{
      color: #181818ab;
    }
  }
  &>.btn-login{
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
  &>.btn-login:hover{
    transform: scale(1.01);
  }
`;
const FormCheckOrder = () => {
  const formik = useFormik({
    initialValues: {
      orderNumber: "",
      orderEmail: "",
      ZIPCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <FormCheckOrderStyle>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="orderNumber"
          name="orderNumber"
          label="Order Number"
          value={formik.values.orderNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.orderNumber && Boolean(formik.errors.orderNumber)
          }
          helperText={formik.touched.orderNumber && formik.errors.orderNumber}
        />
        <TextField
          fullWidth
          id="orderEmail"
          name="orderEmail"
          label="Order Email"
          value={formik.values.orderEmail}
          onChange={formik.handleChange}
          error={formik.touched.orderEmail && Boolean(formik.errors.orderEmail)}
          helperText={formik.touched.orderEmail && formik.errors.orderEmail}
        />
        <TextField
          fullWidth
          id="ZIPCode"
          name="ZIPCode"
          label="ZIPCode"
          type="Billing ZIP Code"
          value={formik.values.ZIPCode}
          onChange={formik.handleChange}
          error={formik.touched.ZIPCode && Boolean(formik.errors.ZIPCode)}
          helperText={formik.touched.ZIPCode && formik.errors.ZIPCode}
        />
        <Button
          className="btn-login"
          variant="contained"
          fullWidth
          type="submit"
        >
          Check status
        </Button>
      </form>
    </FormCheckOrderStyle>
  );
};
export default FormCheckOrder;
