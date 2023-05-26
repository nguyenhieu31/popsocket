import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CommentEdit from "./edit-comment/edit-comment";
import {
  getAllComment,
  CreateComment,
  incrementButtonLike,
  incrementButtonDislike,
  DeleteComment,
} from "../../../redux/comment/comment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "animate.css";
import { toast } from "react-toastify";
const FeedbackStyle = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: "Open Sans", sans-serif;
  overflow: hidden;
  & > .powered {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    height: 50px;
    align-items: center;
    border-top: 1px solid #d4d4d4;
    transition: all 0.3s ease-in-out;
    & > a {
      text-decoration: none;
      color: #181818;
      cursor: pointer;
    }
    & > .logo {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #181818;
      text-align: center;
      & > span {
        width: 100%;
        height: 100%;
        font-size: 7px;
        color: #ffffff;
        font-weight: bold;
      }
    }
  }
  & > .powered > a:hover {
    text-decoration: underline;
  }
  & > .view-evaluate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #1818189e;
    & > .view-text {
      color: #6a6c77;
    }
  }
  & > .write-question-review {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    & > div {
      display: flex;
      align-items: center;
      background-color: #181818;
      color: #ffffff;
      padding: 10px 1rem;
      gap: 10px;
      border-radius: 2rem;
      cursor: pointer;
      font-weight: bold;
      transform: scale(1);
      transition: all 0.2s ease-in-out;
    }
    & > div:hover {
      opacity: 0.8;
      transform: scale(1.01);
    }
  }
  & > .input-review {
    & > h4 {
      color: #6a6c77;
      font-weight: normal;
    }
    & > .rating {
      margin-bottom: 1rem;
      color: #181818;
      & > .icon-rating > span {
        color: #181818;
        font-size: 1rem;
      }
    }
    & > form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 10px;
      & > .connect-wrapper {
        display: flex;
        gap: 1rem;
      }
      & > .btn-submit {
        display: flex;
        justify-content: flex-end;
        & > button {
          background-color: #181818;
        }
      }
    }
  }

  & > .box-review {
    font-family: "Open Sans", sans-serif;
    color: #181818;
    & > .header-line {
      display: flex;
      align-items: center;
      gap: 1rem;
      & > span {
        padding: 12px;
        cursor: pointer;
        font-weight: bold;
        color: #595959;
        transition: all 0.2s ease-in-out;
      }
      & > span.active {
        color: #181818;
        border: 1px solid #f9f9f9;
        border-bottom: none;
      }
      & > span:hover {
        color: #181818;
      }
    }

    & > .container {
      margin: 1.5rem 0;
      & > .first-ask-write-review {
        width: 100%;
        height: 300px;
        & > .content {
          display: none;
        }
        & > .content.active {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1rem;
          height: 100%;
          border: 1px solid #f9f9f9;
          & > .text {
            padding: 12px;
            border-radius: 2rem;
            color: #ffffff;
            font-weight: bold;
            background-color: #181818;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            transform: scale(1);
          }
          & > .text:hover {
            transform: scale(1.01);
            opacity: 0.8;
          }
        }
      }
      & > .box-comment {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #e3e3e3;
        padding: 1rem 10px;
        & > .box-left {
          display: flex;
          gap: 0.5rem;
          & > .avatar-user {
            height: max-content;
            & > svg {
              width: 50px;
              height: 50px;
            }
          }
          & > .content-comment {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            color: #181818;
            & > .name-user {
              font-size: 14px;
              font-weight: 700;
            }
            & > .rating > span {
              color: #181818;
              font-size: 1rem;
              opacity: 1;
            }
            & > .description,
            & > .title {
              margin: 0;
              color: #6b6d76;
            }
            & > .grouping-reference {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              &>.share-edit-delete{
                display: flex;
                align-items: center;
                gap: 0.5rem;
                &>.delete,
                &>.edit,
                & > .share {
                  display: flex;
                  gap: 0.25rem;
                  align-items: center;
                  font-size: 0.9rem;
                  cursor: pointer;
                  transition: all 0.35 ease-in-out;
                  & > svg {
                    width: 15px;
                    height: 15px;
                  }
                }
                &>.delete:hover,
                &>.edit:hover,
                & > .share:hover {
                  opacity: 0.8;
                }
              }
              & > .reference > a {
                color: #181818;
                text-decoration: none;
              }
              & > .reference > a:hover {
                text-decoration: underline;
              }
            }
          }
        }
        & > .box-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          & > .interaction {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            & > .like-dislike > div,
            & > .like-dislike {
              display: flex;
              gap: 0.5rem;
              align-items: center;
            }
            & > .like-dislike > div > svg {
              cursor: pointer;
              width: 17px;
              height: 17px;
              transition: all 0.25s ease-in-out;
            }
            & > .like-dislike > div > svg:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 545px){
    &>.box-review>.container>.box-comment{
      flex-direction: column;
      gap: 1rem;
      &>.box-right{
        flex-direction: row;
        justify-content: space-evenly;
        &>.interaction>span{
          display: none;
        }
      }
      &>.box-left>.content-comment>.grouping-reference{
        align-items: flex-start;
        flex-direction: column;
      }
    }
    &>.input-review>form>.connect-wrapper{
      flex-direction: column;
    }
`;
const validationSchema = yup.object({
  title: yup.string("Enter your title").required("Title is required"),
  review: yup.string("Enter your review").required("Review is required"),
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
const Feedback = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showInput, setShowInput] = useState(false);
  const [rating, setRating] = useState(5);
  const [open, setOpen] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [isComment, setComment] = useState("");
  const { user } = useSelector((state) => state.users);
  const formik = useFormik({
    initialValues: {
      title: "",
      review: "",
      name: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (user) {
        const data = { ...values, rating, id, id_user: user.id };
        setShowInput(false);
        dispatch(CreateComment(data));
      } else {
        toast.error("you must be login");
      }
    },
  });
  useEffect(() => {
    if (id) {
      dispatch(getAllComment(id));
    }
  }, [dispatch, id]);
  const { comments } = useSelector((state) => state.comment);
  const handleLikeButtonClick = (comment) => {
    handleClickLikeComment(comment);
  };
  const handleEditButtonClick = (comment) => {
    setComment(comment);
    setOpen(true);
  };
  const handleClickLikeComment = (comment) => {
    let liked = comment.liked;
    if (liked) {
      liked++;
    } else {
      liked = 1;
    }
    const data = {
      id: comment.id,
      id_product: comment.id_product,
      email: user.email,
      liked,
      action: "liked",
      id_user: user.id,
    };
    dispatch(incrementButtonLike(data));
  };
  const handleDislikeButtonClick = (comment) => {
    handleClickDislikeComment(comment);
  };
  const handleClickDislikeComment = (comment) => {
    let disliked = comment.disliked;
    if (disliked) {
      disliked++;
    } else {
      disliked = 1;
    }
    const data = {
      id: comment.id,
      id_product: comment.id_product,
      email: user.email,
      disliked,
      action: "disliked",
      id_user: user.id,
    };
    dispatch(incrementButtonDislike(data));
  };
  const handleDeleteButtonClick = (comment) => {
    handleClickDeleteComment(comment);
    setDialogDelete(false);
  };
  const handleClickDeleteComment = (comment) => {
    const data = {
      id_user: user.id,
      comment,
    };
    dispatch(DeleteComment(data));
  };
  const handleClickOpen = () => {
    setDialogDelete(true);
  };
  const handleClose = () => {
    setDialogDelete(false);
  };
  return (
    <FeedbackStyle className="feedback">
      <div className="powered">
        <Link>
          <span>Powered by</span>
        </Link>
        <div className="logo">
          <span>YOTPO</span>
        </div>
      </div>
      <div className="view-evaluate">
        <div className="view-icon">
          <Rating
            name="half-rating-read"
            value={
              comments &&
              comments.reduce((sum, comment, index) => {
                return (sum + comment.rating) / (index + 1);
              }, 0)
            }
            precision={0.5}
            style={{ color: "#181818" }}
            readOnly
          />
        </div>
        <div className="view-text">
          <span>{comments && comments.length} Reviews</span>
        </div>
      </div>
      <div className="write-question-review">
        <div
          className="write-review"
          onClick={() => {
            setShowInput(true);
          }}
        >
          <ModeEditOutlineIcon />
          <span>Write a Review</span>
        </div>
        <div className="write-question">
          <QuestionAnswerIcon />
          <span>Ask A Question</span>
        </div>
      </div>
      {showInput ? (
        <div className="input-review animate__animated animate__fadeInDown">
          <h4 className="title">WRITE A REVIEW</h4>
          <div className="rating">
            <div className="icon-rating">
              <Typography component="legend">Score:</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              id="review"
              name="review"
              label="review"
              value={formik.values.review}
              onChange={formik.handleChange}
              error={formik.touched.review && Boolean(formik.errors.review)}
              helperText={formik.touched.review && formik.errors.review}
            />
            <div className="connect-wrapper">
              <TextField
                fullWidth
                id="name"
                name="name"
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="btn-submit">
              <Button variant="contained" type="submit">
                Post
              </Button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      <div className="box-review">
        <div className="header-line">
          <span className="active">REVIEWS</span>
          <span>QUESTIONS</span>
        </div>
        <div className="container">
          {comments.length > 0 ? (
            <>
              {comments.map((comment, index) => {
                return (
                  <div className="box-comment" key={index}>
                    <div className="box-left">
                      <div className="avatar-user">
                        <AccountCircleIcon />
                      </div>
                      <div className="content-comment">
                        <span className="name-user">{comment.name_user}.</span>
                        <div className="rating">
                          <Rating
                            name="disabled"
                            value={comment.rating}
                            disabled
                          />
                        </div>
                        <h3 className="title">{comment.title}.</h3>
                        <div className="description">
                          <ReactReadMoreReadLess
                            charLimit={100}
                            readMoreText={"Read more ▼"}
                            readLessText={"Read less ▲"}
                          >
                            {comment.review}
                          </ReactReadMoreReadLess>
                        </div>
                        <div className="grouping-reference">
                          <div className="share-edit-delete">
                            <div className="share">
                              <ShareIcon />
                              <span>Share</span>
                            </div>
                            {user && comment.email_user === user.email ? (
                              <>
                                <div
                                  className="edit"
                                  onClick={() => {
                                    handleEditButtonClick(comment);
                                  }}
                                >
                                  <EditIcon />
                                  <span>Edit</span>
                                </div>
                                <div
                                  className="delete"
                                  onClick={() => {
                                    handleClickOpen();
                                  }}
                                >
                                  <DeleteOutlineRoundedIcon />
                                  <span>Delete</span>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          {open && (
                            <CommentEdit
                              open={open}
                              comment={isComment}
                              setOpen={setOpen}
                              id={user && user.id}
                            />
                          )}
                          {dialogDelete && (
                            <Dialog
                              open={dialogDelete}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"You are sure delete your comment?"}
                              </DialogTitle>
                              <DialogActions>
                                <Button
                                  onClick={handleClose}
                                  style={{ color: "#181818" }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleDeleteButtonClick(comment);
                                  }}
                                  autoFocus
                                  style={{ color: "red" }}
                                >
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="box-right">
                      <div className="created-day">
                        <span>{comment.createdAt.slice(0, 10)}</span>
                      </div>
                      <div className="interaction">
                        <span>Was This Review Helpful?</span>
                        <div className="like-dislike">
                          <div onClick={() => handleLikeButtonClick(comment)}>
                            <ThumbUpIcon />
                            <span>{comment.liked && comment.liked}</span>
                          </div>
                          <div
                            onClick={() => handleDislikeButtonClick(comment)}
                          >
                            <ThumbDownIcon />
                            <span>{comment.disliked && comment.disliked}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="first-ask-write-review">
              <div className="content active">
                <div className="icon-evaluate">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <div className="text first-write-review">
                  <span>be the first to write a review</span>
                </div>
              </div>
              <div className="content">
                <div className="text first-ask-review">
                  <span>be the first to ask a review</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FeedbackStyle>
  );
};
export default Feedback;
