// import styles from "./Style.module.scss";
import Tooltip from "@mui/material/Tooltip";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import SendIcon from "@mui/icons-material/Send";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMessageBot,
  getMessageByCLient,
  getMessageClient,
  addMessage,
  closeMessage,
} from "../../../redux/chatBot/chatBot";
import styled, { keyframes } from "styled-components";
const loading = keyframes`
    0% {
      color: green;
    }
    50% {
      color: red;
    }
    100%{
      color: black;
    }
`;
const StyleChatBot = styled.div`
  position: fixed;
  bottom: 10px;
  left: 20px;
  right: 0;
  z-index: 99;
  width: max-content;
  height: fit-content;
  & > .chat-bot {
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9ce5ff;
    color: #0400fe !important;
    fill: #235e73 !important;
    border-radius: 50%;
    & > svg {
      width: 40px;
      height: 40px;
    }
  }
  & > .box-chat {
    width: 350px;
    max-width: 100%;
    max-height: 500px;
    border-radius: 0.5rem;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: grid;
    grid-template-rows: 1fr 7.5fr 1.5fr;
    & > .header {
      background-color: #9ce5ff;
      color: #000000d9 !important;
      fill: #235e73 !important;
      height: 100%;
      border-radius: 0.5rem 0.5rem 0 0;
      & > .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
        & > .avatar-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          & > .avatar {
            width: 40px;
            height: 40px;
            & > svg {
              width: 100%;
              height: 100%;
              color: #0400fe;
            }
          }
          & > .title {
            color: #000000d9;
            & > p,
            & > h3 {
              font-size: 1rem;
              margin: 0;
            }
          }
        }
        & > .icon-close-chat {
          width: 30px !important;
          text-align: center;
          cursor: pointer;
          border-radius: 0.5rem;
          transition: all 0.25s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          &:hover {
            background-color: #235e733d;
          }
        }
      }
    }
    & > .box-chat-body {
      width: 100%;
      overflow: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 6px;
        background-color: #f5f5f5;
      }
      &::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 3px;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
      }
      & > .box-message {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        height: auto;
        margin: 12px 0;
        & > .bot-message {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          word-wrap: break-word;
          word-break: break-all;
          & > p {
            max-width: 70%;
            height: 100%;
            padding: 15px;
            background: #e4e6eb;
            border-radius: 1rem;
            margin: 0;
            margin-left: 10px;
            overflow-wrap: break-word;
          }
        }
        & > .human-message {
          color: #ffffff;
          display: flex;
          flex-wrap: wrap;
          overflow: auto;
          flex-direction: row-reverse;
          width: 350px;
          & > p {
            width: 70%;
            max-width: max-content;
            height: 100%;
            padding: 15px;
            background: #0084ff;
            border-radius: 1rem;
            margin: 0;
            margin-right: 10px;
            overflow-wrap: break-word;
          }
        }
      }
      & > .loading {
        width: max-content;
        animation: ${loading} 2s infinite ease-in-out both;
        & > p {
          padding: 15px;
          background: #e4e6eb;
          border-radius: 1rem;
          margin: 0;
          margin-left: 10px;
        }
      }
    }
    & > .send-message {
      border-top: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      color: #bbb;
      gap: 1rem;
      & > form {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        & > input {
          width: 100%;
          outline: none;
          border: none;
          padding: 0;
          font-size: 1rem;
        }
      }
      & > .icon-send-message {
        cursor: pointer;
        transition: all 0.25s ease-in-out;
        &:hover {
          color: #0068c8;
        }
      }
    }
  }
`;

const ChatBox = () => {
  const dispatch = useDispatch();
  const [activeChatBox, setActiveChatBox] = useState(false);
  const [humanMessage, setHumanMessage] = useState("");
  const { messages, loading } = useSelector((state) => state.ChatBot);
  const memoizeMessages = useMemo(() => messages, [messages]);
  const memoizeLoading = useMemo(() => loading, [loading]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    // Cuộn đến phần tử cuối cùng của danh sách tin nhắn
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [memoizeMessages]);
  useEffect(() => {
    dispatch(getMessageBot());
  }, [dispatch]);
  const handleInputChange = useCallback((e) => {
    setHumanMessage(e.target.value);
  }, []);
  const handelSendMessage = useCallback(() => {
    dispatch(getMessageClient(humanMessage));
    const newMessage = { bot: null, human: humanMessage };
    dispatch(addMessage(newMessage));
    dispatch(getMessageByCLient(humanMessage));
    setHumanMessage("");
    inputRef.current.value = "";
  }, [dispatch, humanMessage]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handelSendMessage();
    }
  };
  const handleCloseMessage = (e) => {
    setActiveChatBox(false);
    dispatch(closeMessage());
  };
  return (
    <StyleChatBot className="wrapper">
      {activeChatBox ? (
        <div className="box-chat">
          <div className="header">
            <nav className="nav-bar">
              <div className="avatar-title">
                <div className="avatar">
                  <SmartToyTwoToneIcon />
                </div>
                <div className="title">
                  <h3>PopSocketChat.vn</h3>
                  <p>chat with us</p>
                </div>
              </div>
              <div className="icon-close-chat" onClick={handleCloseMessage}>
                <HorizontalRuleIcon />
              </div>
            </nav>
          </div>
          <div className="box-chat-body">
            {messages.map((message, index) => {
              const { bot, human } = message;
              return (
                <div className="box-message" key={index}>
                  {human && (
                    <div className="human-message">
                      <p>{human}</p>
                    </div>
                  )}
                  {bot && (
                    <div className="bot-message">
                      <p>{bot.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
            {memoizeLoading && (
              <div className="loading">
                <p>loading...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="send-message">
            <form>
              <input
                type="text"
                placeholder="write something here"
                onChange={handleInputChange}
                value={humanMessage}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />
            </form>
            <div className="icon-send-message">
              <SendIcon onClick={handelSendMessage} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="chat-bot"
          onClick={() => {
            setActiveChatBox(true);
          }}
        >
          <Tooltip title="chat bot" placement="right" color="white">
            <SmartToyTwoToneIcon className="icon" />
          </Tooltip>
        </div>
      )}
    </StyleChatBot>
  );
};
export default ChatBox;
