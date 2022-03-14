import React, { FormEvent, useRef, useContext } from "react";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import ActionButton from "../../atoms/ActionButton/ActionButton";
import FormInput from "../../atoms/FormInput/FormInput";

const API_URL = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userName = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    const requestBody = {
      userName,
      password,
    };

    if (!userName || !password) {
      alert("Please fill out all the required fields");
      return;
    }

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        authContext?.login(data.user, data.accessToken);
        navigate("/");
        return data;
      })
      .catch((err) => {
        alert("Oops, something went wrong!");
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">
      <h2 className="title">Login to ChatApp</h2>
      <div className="form-group">
        <label>Username</label>
        <FormInput
          inputType="text"
          placeholder="Please enter your username"
          ref={usernameRef}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <FormInput
          inputType="password"
          placeholder="Please enter your password"
          ref={passwordRef}
        />
      </div>
      <div className="form-group">
        <ActionButton type="submit" label="Login" btnStyle="primary" />
      </div>
    </form>
  );
};

export default LoginForm;
