import React from "react";
import "./ChatMessageTextArea.scss";
const ChatMessageTextArea = React.forwardRef<HTMLTextAreaElement>(
  (props, ref) => {
    return (
      <textarea
        name="message"
        id="message"
        ref={ref}
        className="chat-message-text-area"
      />
    );
  }
);

export default ChatMessageTextArea;
