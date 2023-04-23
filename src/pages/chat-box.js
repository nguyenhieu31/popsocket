import ChatBox from "../component/UI/chat-box/chat-box";
import React from "react";
const ChatBoxPage = ({ sideBar, activeSearch, ...props }) => {
  return <>{!sideBar && <ChatBox activeSearch={activeSearch} />}</>;
};
export default ChatBoxPage;
