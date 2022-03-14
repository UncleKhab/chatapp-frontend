import React, { FormEvent, useContext, useRef } from "react";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import ActionButton from "../../atoms/ActionButton/ActionButton";
import ChatMessageTextArea from "../../atoms/ChatMessageTextArea/ChatMessageTextArea";
import "./ChatMessageForm.scss";

const API_URL = process.env.REACT_APP_API_URL;
interface Props {
  chatId: string;
}
const ChatMessageForm: React.FC<Props> = (props) => {
  const { chatId } = props;
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const authContext = useContext(AuthContext);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const requestBody = {
      chatId: chatId,
      messageString: messageRef.current?.value,
    };
    fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Brearer ${authContext?.accessToken}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          formRef.current?.reset();
        }
      })
      .catch((err) => {
        throw new Error(err.statusText);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="chat-message-form" ref={formRef}>
      <ChatMessageTextArea ref={messageRef} />
      <ActionButton type="submit" label="Send Message" btnStyle="primary" />
    </form>
  );
};

export default ChatMessageForm;
