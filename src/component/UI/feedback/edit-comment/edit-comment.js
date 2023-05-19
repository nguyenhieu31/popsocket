import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { UpdateComment } from "../../../../redux/comment/comment";
const validationSchema = yup.object({
  title: yup.string("Enter your title").required("Title is required"),
  review: yup.string("Enter your review").required("Review is required"),
});
const CommentEdit = ({ comment, open, setOpen }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(comment.rating);
  const formik = useFormik({
    initialValues: {
      title: comment.title,
      review: comment.review,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setOpen(false);
      const data = {
        ...values,
        rating,
        id: comment.id,
        id_product: comment.id_product,
      };
      dispatch(UpdateComment(data));
    },
  });
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title">{"Edit comment"}</DialogTitle>
          <DialogContent>
            <div
              id="alert-dialog-description"
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <div
              id="alert-dialog-description"
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <label htmlFor="title">Title</label>
              <TextField
                fullWidth
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                style={{ width: "600px" }}
              />
            </div>
            <div
              id="alert-dialog-description"
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <label htmlFor="review">Review</label>
              <TextField
                fullWidth
                id="review"
                name="review"
                value={formik.values.review}
                onChange={formik.handleChange}
                error={formik.touched.review && Boolean(formik.errors.review)}
                helperText={formik.touched.review && formik.errors.review}
                style={{ width: "600px" }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" autoFocus>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CommentEdit;
