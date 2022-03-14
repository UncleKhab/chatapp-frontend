import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import IChatModel from "../../../_core/models/IChatModel";
import ChatListItem from "../../organisms/ChatListItem/ChatListItem";
import "./ChatsList.scss";
const API_URL = process.env.REACT_APP_API_URL;

const ChatsList = () => {
  const authContext = useContext(AuthContext);
  const [chatList, setChatList] = useState<IChatModel[]>([]);

  const loadChats = () => {
    fetch(`${API_URL}/chats`, {
      headers: {
        Authorization: `Bearer ${authContext?.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((chatsData) => {
        setChatList(chatsData);
        return chatsData;
      })
      .catch((err) => {
        console.error(err.statusText);
      });
  };
  useEffect(() => {
    loadChats();
  }, []);

  return (
    <>
      {chatList.length > 0 && (
        <ul className="chats-list">
          {chatList.map((chatData, index) => (
            <ChatListItem
              itemData={chatData}
              index={index}
              key={`${chatData.id}`}
            />
          ))}
        </ul>
      )}
      {chatList.length === 0 && <h2>There are no active chats</h2>}
    </>
  );
};

export default ChatsList;
