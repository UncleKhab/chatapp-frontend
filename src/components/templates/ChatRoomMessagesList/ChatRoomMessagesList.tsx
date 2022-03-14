import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import IMessageModel from "../../../_core/models/IMessageModel";
import ChatMessage from "../../atoms/ChatMessage/ChatMessage";
import "./ChatRoomMessagesList.scss";

interface Props {
  chatId: string;
}
const API_URL = process.env.REACT_APP_API_URL;
const socket = io(`${API_URL}`);

const ChatRoomMessagesList: React.FC<Props> = (props) => {
  const { chatId } = props;
  const [messageList, setMessageList] = useState<IMessageModel[]>([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    socket.off(`${chatId}`).on(`${chatId}`, async (response) => {
      await loadSingleMessage(response);
      return;
    });
    return () => {
      socket.off(`${chatId}`);
    };
  }, [socket, messageList]);

  useEffect(() => {
    loadAllMessages();
  }, []);

  const loadAllMessages = () => {
    fetch(`${API_URL}/messages/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext?.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((messageData) => {
        setMessageList(messageData);
      });
  };

  const loadSingleMessage = async (socketResponse: any) => {
    const response = await fetch(
      `${API_URL}/messages/message/${socketResponse.messageId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext?.accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newMessage = await response.json();
    await updateMessageList(newMessage);
  };

  const updateMessageList = async (newMessage: IMessageModel) => {
    const messageToUpdateIndex = messageList?.findIndex(
      (message) => message.id === newMessage.id
    );
    if (messageToUpdateIndex < 0) {
      setMessageList((prevState) => {
        return [...prevState, newMessage];
      });
    } else {
      setMessageList((prevState) => {
        prevState[messageToUpdateIndex] = newMessage;
        return [...prevState];
      });
    }
  };
  return (
    <div className="chat-room-messages-wrapper">
      {messageList &&
        messageList.map((singleMessage) => (
          <ChatMessage message={singleMessage} key={`${singleMessage.id}`} />
        ))}
    </div>
  );
};

export default ChatRoomMessagesList;
