import { Link } from "react-router-dom";
import styled from "styled-components";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
const FeedbackStyle = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: "Open Sans", sans-serif;
  & > .powered {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    height: 50px;
    align-items: center;
    cursor: pointer;
    border-top: 1px solid #d4d4d4;
    transition: all 0.3s ease-in-out;
    & > a {
      text-decoration: none;
      color: #181818;
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
  & > .powered:hover > a {
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
  }
`;
const Feedback = () => {
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
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
          <StarOutlineIcon />
        </div>
        <div className="view-text">
          <span>0 Reviews</span>
        </div>
      </div>
      <div className="write-question-review">
        <div className="write-review">
          <ModeEditOutlineIcon />
          <span>Write a Review</span>
        </div>
        <div className="write-question">
          <QuestionAnswerIcon />
          <span>Ask A Question</span>
        </div>
      </div>
      <div className="box-review">
        <div className="header-line">
          <span className="active">REVIEWS</span>
          <span>QUESTIONS</span>
        </div>
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
      </div>
    </FeedbackStyle>
  );
};
export default Feedback;
