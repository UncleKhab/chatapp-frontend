import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.scss";

import NavBar from "./components/templates/NavBar/NavBar";
import ChatRoomPage from "./pages/chat-room/ChatRoom";
import ChatsPage from "./pages/chats/ChatPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import UsersPage from "./pages/users/UsersPage";
import { AuthContext } from "./store/AuthContext/AuthContext";

function App() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authContext?.accessToken) {
      navigate("/login");
    }
  }, [authContext?.accessToken, navigate]);

  return (
    <div className="app-wrapper">
      {authContext?.accessToken && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/chats/:chatId" element={<ChatRoomPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
