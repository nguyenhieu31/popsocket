import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import waiting from "../../hooks/waiting";
const API_URL = process.env.REACT_APP_API_URL;
export const getMessageBot = createAsyncThunk(
  //action type string
  "messageBot/getMessageBot",
  // callback function
  async (data) => {
    const url = `${API_URL}/chatbot/answer`;
    try {
      await waiting(2000);
      const res = await axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (err) {}
  }
);
export const getMessageByCLient = createAsyncThunk(
  //action type string
  "messageByClient/getMessageByCLient",
  // callback function
  async (data) => {
    const url = `${API_URL}/chatbot/question`;
    try {
      await waiting(2000);
      const res = await axios.get(url);
      let replaceData = data.replace(/\s+/g, "");
      replaceData = replaceData.toLowerCase();
      if (res) {
        const answer = res.data.find((item) => {
          return replaceData.includes(item.question);
        });
        if (answer) {
          return answer;
        } else {
          return null;
        }
      }
    } catch (err) {}
  }
);
const initialState = {
  messagesBot: [],
  messageBot: {},
  messageHuman: "",
  messages: [],
  loading: false,
  errorMessage: "",
};

const ChatBot = createSlice({
  name: "chatBot",
  initialState,
  reducers: {
    getMessageClient: (state, action) => {
      return {
        ...state,
        messageHuman: action.payload,
      };
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    closeMessage: (state, action) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessageBot.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMessageByCLient.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMessageBot.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesBot = action.payload;
      })
      .addCase(getMessageByCLient.fulfilled, (state, action) => {
        state.loading = false;
        const bot = JSON.parse(JSON.stringify(state.messagesBot));
        const data = action.payload;
        if (data) {
          const answerBot = bot.find((answer) => {
            return answer.id === data.id_chatbot;
          });
          state.messageBot = answerBot;
          if (state.messageBot !== undefined && state.messageHuman !== "") {
            const arr = {
              bot: state.messageBot,
              human: "",
            };
            state.messages.push(arr);
          }
        } else {
          state.messageBot = {
            answer: "sorry, i don't understand your question",
          };
          if (state.messageBot !== undefined && state.messageHuman !== "") {
            const arr = {
              bot: state.messageBot,
              human: "",
            };
            state.messages.push(arr);
          }
        }
      })
      .addCase(getMessageBot.rejected, (state, action) => {
        state.isSearch = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getMessageByCLient.rejected, (state, action) => {
        state.isSearch = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export const { getMessageClient, addMessage, closeMessage } = ChatBot.actions;
export default ChatBot.reducer;
