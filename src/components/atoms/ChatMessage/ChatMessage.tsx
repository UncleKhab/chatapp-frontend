import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import IMessageModel from "../../../_core/models/IMessageModel";
import "./ChatMessage.scss";
interface Props {
  message: IMessageModel;
}

const ChatMessage: React.FC<Props> = (props) => {
  const authContext = useContext(AuthContext);
  const [ownMessage, setOwnMessage] = useState(false);
  const { message } = props;
  useEffect(() => {
    if (message.userId === authContext?.user?.id) {
      setOwnMessage(true);
    }
  }, [message]);

  return (
    <div className={`${ownMessage ? "owner" : ""} chat-message`}>
      <p>{message.message}</p>
    </div>
  );
};

export default ChatMessage;
