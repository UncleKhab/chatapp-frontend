import React from "react";
import "./ChatListItem.scss";
import IChatModel from "../../../_core/models/IChatModel";
import ActionButton from "../../atoms/ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";
interface Props {
  index: number;
  itemData: IChatModel;
}

const ChatListItem: React.FC<Props> = (props) => {
  const { index } = props;
  const { id } = props.itemData;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/chats/${id}`);
  };
  return (
    <li className="chat-item">
      <div className="chat-item__details">
        <p>
          <label>Room Number </label>#{index}
        </p>
      </div>
      <div className="chat-item__details">
        <label>Room Id</label>
        <p>{id}</p>
      </div>
      <ActionButton
        action={handleNavigate}
        label="Join Chat"
        type="button"
        btnStyle="secondary"
      />
    </li>
  );
};

export default ChatListItem;
