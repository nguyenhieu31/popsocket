/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { updateUser } from "../../../redux/users/users";
import { useFormik } from "formik";
const ProfileStyle = styled.div`
  font-family: "Open Sans", sans-serif;
  color: #181818;
  & > .dashboard {
    & > a {
      color: #181818;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
    }
    & > a:hover {
      color: #1818189e;
      text-decoration: underline;
    }
  }
  & > .container {
    position: relative;
    margin: 1rem 2rem;
    display: grid;
    grid-template-columns: 6fr 4fr;
    gap: 1rem;
    background-color: #f9f9f9;
    border-radius: 1rem;
    min-height: 500px;
    & > .info-left {
      padding: 1rem;
      & > .header-line {
        font-size: 1.1rem;
        color: #64646d;
        margin: 0 0 1.5rem 0;
      }
      & > .box {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        & > div {
          display: grid;
          grid-template-columns: 2fr 8fr;
        }
        & > .avatar-name {
          & > .avatar {
            display: block;
            height: auto;
            width: max-content;
            & > div {
              width: 130px;
              height: 130px;
            }
          }
          & > .name {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            & > .nickName,
            & > .firstName-lastName {
              display: grid;
              grid-template-columns: 4fr 6fr;
              line-height: 40px;
              & > label {
                font-size: 0.9rem;
              }
              & > input {
                padding: 10px;
                outline: none;
                border-radius: 0.5rem;
                border: 1px solid rgb(235, 235, 240);
              }
            }
          }
        }
        & > .date {
          & > label {
            font-size: 0.9rem;
            height: 40px;
            line-height: 40px;
          }
          & > .choose-date {
            display: flex;
            align-items: center;
            gap: 1rem;
            & > #date {
              width: 100px;
              padding: 10px;
              border-radius: 0.5rem;
              border: 1px solid rgb(235, 235, 240);
            }
          }
        }
        & > .sex {
          max-height: 42px;
          & > label {
            font-size: 0.9rem;
            height: 100%;
            line-height: 42px;
          }
          & > .choose-sex {
            height: 100%;
            color: #181818;
          }
        }
        & > .nationality {
          height: 40px;
          & > label {
            font-size: 0.9rem;
            line-height: 40px;
          }
          & > .choose-nationality {
            width: 100%;
            heigh: 100%;
            & > select {
              padding: 10px;
              width: 100%;
              border-radius: 0.5rem;
              border: 1px solid rgb(235, 235, 240);
            }
          }
        }
      }
      & > .btn-save {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.5rem;
        cursor: pointer;
        & > span {
          padding: 10px 2rem;
          background-color: #0b74e5;
          color: white;
          border-radius: 0.5rem;
          transition: all 0.2s ease-in-out;
        }
        & > span:hover {
          opacity: 0.8;
        }
      }
    }
    & > .divided {
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: rgb(235, 235, 240);
      right: 40%;
      top: 0;
    }
    & > .info-right {
      padding: 1rem;
      & > .social-network,
      & > .security,
      & > .phoneNumber-and-email {
        & > .header-line {
          font-size: 1.1rem;
          color: #64646d;
          margin: 0 0 1.5rem 0;
        }
        & > .facebook,
        & > .google,
        & > .security,
        & > .code-pin,
        & > .email,
        & > .phoneNumber {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          margin: 1rem 0;
          & > .info {
            display: flex;
            gap: 1rem;
            & > .info-icon {
              & > svg {
                color: #b5b5bd;
              }
            }
            & > .info-content {
              display: flex;
              flex-direction: column;
            }
          }
          & > .btn {
            padding: 5px 8px;
            border-radius: 0.5rem;
            border: 1px solid #0b74e5;
            cursor: pointer;
            color: #0b74e5;
            transition: all 0.1s ease-in-out;
          }
          & > .btn:hover {
            opacity: 0.7;
          }
        }
        & > hr {
          margin: 0;
          border: none;
          height: 1px;
          background-color: rgb(235, 235, 240);
        }
      }
      & > .btn-save {
        display: none;
        align-items: center;
        justify-content: center;
        margin-top: 1.5rem;
        cursor: pointer;
        & > span {
          padding: 10px 2rem;
          background-color: #0b74e5;
          color: white;
          border-radius: 0.5rem;
          transition: all 0.2s ease-in-out;
        }
        & > span:hover {
          opacity: 0.8;
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    & > .container {
      display: flex;
      flex-direction: column;
      & > .divided {
        display: none;
      }
      & > .info-left > .btn-save {
        display: none;
      }
      & > .info-right > .btn-save {
        display: flex;
      }
    }
  }
  @media screen and (max-width: 545px) {
    & > .container {
      margin: 1rem 0 0 0;
    }
    & > .container > .info-left > .box {
      & > .avatar-name {
        display: flex;
        flex-direction: column;
        align-items: center;
        & > .name {
          gap: 1rem;
          margin-top: 1rem;
          width: 100%;
        }
      }
      & > .sex {
        max-height: none;
        & > .choose-sex > div > #sex {
          flex-direction: column;
        }
      }
    }
  }
`;
const ProfileUi = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id: 1,
      nickName: "",
      date: "",
      sex: "male",
      nationality: "vietnam",
    },
    onSubmit: (values) => {
      handelClickSave(values);
    },
  });
  const dispatch = useDispatch();
  const { isLogined, user } = useSelector((state) => state.users);
  const { email, firstName, lastName, phone, id } = user;
  useEffect(() => {
    if (user) {
      updateForm(user);
    }
  }, []);
  function handelClickSave(values) {
    values.id = id;
    dispatch(updateUser(values));
  }
  function updateForm(values) {
    const { nickName, sex, nationality, date } = values;
    formik.setFieldValue("nickName", nickName || "");
    formik.setFieldValue("sex", sex || "female");
    formik.setFieldValue("nationality", nationality || "vietnam");
    formik.setFieldValue("date", date || "");
  }
  return (
    <>
      {isLogined ? (
        <ProfileStyle style={{ marginTop: "7rem", padding: "1rem 2rem" }}>
          <div className="dashboard">
            <Link to="/new">
              <span>Home</span>
            </Link>
          </div>
          <div className="container">
            <div className="info-left">
              <h3 className="header-line">Personal Information</h3>
              <div className="box">
                <div className="avatar-name">
                  <Stack
                    direction="row"
                    spacing={2}
                    className="avatar"
                    style={{ position: "relative" }}
                  >
                    <Avatar src="/broken-image.jpg" />
                    <IconButton
                      style={{
                        position: "absolute",
                        right: "5%",
                        bottom: "0",
                        backgroundColor: "#ccc",
                        color: "#fff",
                      }}
                    >
                      <EditIcon style={{ fontSize: "0.8rem" }} />
                    </IconButton>
                  </Stack>
                  <div className="name">
                    <div className="firstName-lastName">
                      <label>Surname & First Name</label>
                      <input
                        type="text"
                        value={`${firstName} ${lastName}`}
                        disabled
                      />
                    </div>
                    <div className="nickName">
                      <label>Nickname</label>
                      <input
                        placeholder="add nickname"
                        id="nickName"
                        name="nickName"
                        value={formik.values.nickName}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="date">
                  <label>Date</label>
                  <div className="choose-date">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="sex">
                  <label>Sex</label>
                  <div className="choose-sex">
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="sex"
                        id="sex"
                        value={formik.values.sex}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="nationality">
                  <label>Nationality</label>
                  <div className="choose-nationality">
                    <select
                      id="nationality"
                      name="nationality"
                      value={formik.values.nationality}
                      onChange={formik.handleChange}
                    >
                      <option value="vietnam">Việt Nam</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="btn-save" onClick={formik.handleSubmit}>
                <span>Save changes</span>
              </div>
            </div>
            <div className="divided"></div>
            <div className="info-right">
              <div className="phoneNumber-and-email">
                <h3 className="header-line">Phone number & Email</h3>
                <div className="phoneNumber">
                  <div className="info">
                    <div className="info-icon">
                      <PhoneIcon />
                    </div>
                    <div className="info-content">
                      <span>Phone Number</span>
                      <span>0{phone}</span>
                    </div>
                  </div>
                  <div className="btn">
                    <span>Update</span>
                  </div>
                </div>
                <hr />
                <div className="email">
                  <div className="info">
                    <div className="info-icon">
                      <MailOutlineIcon />
                    </div>
                    <div className="info-content">
                      <span>Address Email</span>
                      <span>{email && email}</span>
                    </div>
                  </div>
                  <div className="btn">
                    <span>Update</span>
                  </div>
                </div>
              </div>
              <div className="security">
                <h3 className="header-line">Security</h3>
                <div className="security">
                  <div className="info">
                    <div className="info-icon">
                      <LockIcon />
                    </div>
                    <div className="info-content">
                      <span>Set up password</span>
                    </div>
                  </div>
                  <div
                    className="btn"
                    onClick={() => {
                      navigate("/changePassword");
                    }}
                  >
                    <span>Update</span>
                  </div>
                </div>
                <hr />
                <div className="code-pin">
                  <div className="info">
                    <div className="info-icon">
                      <GppGoodOutlinedIcon />
                    </div>
                    <div className="info-content">
                      <span>Set up a PIN code</span>
                    </div>
                  </div>
                  <div className="btn">
                    <span>Establish</span>
                  </div>
                </div>
              </div>
              <div className="social-network">
                <h3 className="header-line">Social network link</h3>
                <div className="facebook">
                  <div className="info">
                    <div className="info-icon">
                      <FacebookOutlinedIcon />
                    </div>
                    <div className="info-content">
                      <span>Facebook</span>
                    </div>
                  </div>
                  <div className="btn">
                    <span>Link</span>
                  </div>
                </div>
                <hr />
                <div className="google">
                  <div className="info">
                    <div className="info-icon">
                      <GoogleIcon />
                    </div>
                    <div className="info-content">
                      <span>Google</span>
                    </div>
                  </div>
                  <div className="btn">
                    <span>Linked</span>
                  </div>
                </div>
              </div>
              <div className="btn-save" onClick={formik.handleSubmit}>
                <span>Save changes</span>
              </div>
            </div>
          </div>
        </ProfileStyle>
      ) : (
        <span>you must be logged in</span>
      )}
    </>
  );
};
export default ProfileUi;
