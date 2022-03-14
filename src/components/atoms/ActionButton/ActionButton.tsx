import React from "react";
import "./ActionButton.scss";

interface Props {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  btnStyle?: "primary" | "secondary" | "info";
  action?: () => void;
}

const ActionButton: React.FC<Props> = (props) => {
  const { label, action, type, btnStyle } = props;
  return (
    <button
      onClick={action}
      type={type}
      className={`action-button ${btnStyle}`}
    >
      {label}
    </button>
  );
};

export default ActionButton;
