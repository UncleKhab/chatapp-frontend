import React from "react";
import "./FormInput.scss";

interface Props {
  inputType: string;
  placeholder: string;
}

const FormInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { inputType, placeholder } = props;
  return (
    <input
      type={inputType}
      placeholder={placeholder}
      ref={ref}
      className="form-input"
    />
  );
});

export default FormInput;
