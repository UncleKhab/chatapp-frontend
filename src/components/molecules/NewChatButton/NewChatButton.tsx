import React, { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import ActionButton from "../../atoms/ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";
interface Props {
  members: string[];
}

const API_URL = process.env.REACT_APP_API_URL;
const NewChatButton: React.FC<Props> = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { members } = props;

  const handleNewChat = () => {
    const requestBody = {
      members: members,
    };

    fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Brearer ${authContext?.accessToken}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((charRoomData) => {
        navigate(`/chats/${charRoomData.id}`);
      })
      .catch((err) => {
        throw Error(err.message);
      });
  };
  return (
    <ActionButton
      label="Start Chat"
      type="button"
      action={handleNewChat}
      btnStyle="secondary"
    />
  );
};

export default NewChatButton;
