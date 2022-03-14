import "./ChatRoom.scss";
import { useParams } from "react-router-dom";
import ChatMessageForm from "../../components/organisms/ChatMessageForm/ChatMessageForm";
import ChatRoomMessageList from "../../components/templates/ChatRoomMessagesList/ChatRoomMessagesList";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/AuthContext/AuthContext";
import IUserModel from "../../_core/models/IUserModel";
const API_URL = process.env.REACT_APP_API_URL;

const ChatRoom = () => {
  const params = useParams();
  const authContext = useContext(AuthContext);
  const chatId = params.chatId;
  // const [membersIds, setMembersIds] = useState<string[]>([]);
  // const [members, setMembers] = useState<IUserModel[]>([]);

  // useEffect(() => {
  //   loadChatInfo();
  // }, []);

  // useEffect(() => {
  //   membersIds.forEach((memberId) => {
  //     if (memberId !== authContext?.user?.id) {
  //       retrieveSingleUser(memberId);
  //     }
  //   });
  // }, [membersIds]);

  // const loadChatInfo = () => {
  //   fetch(`${API_URL}/chats/${chatId}`, {
  //     headers: {
  //       Authorization: `Bearer ${authContext?.accessToken}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setMembersIds(data.chat.members);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // const retrieveSingleUser = async (id: string) => {
  //   fetch(`${API_URL}/users/${id}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${authContext?.accessToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setMembers((prevState) => {
  //         return [...prevState, data];
  //       });
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  if (!chatId) {
    return <p>Looks like this chat is no longer available!</p>;
  }
  return (
    <div className="chat-room-wrapper">
      {/* <div>
        <p>
          Chatting With
          {members.map((member) => (
            <span key={`${member.id}`}> {member.firstName}</span>
          ))}
        </p>
      </div> */}
      <ChatRoomMessageList chatId={chatId} />
      <ChatMessageForm chatId={chatId} />
    </div>
  );
};

export default ChatRoom;
