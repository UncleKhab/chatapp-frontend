import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext/AuthContext";
import "./HomePage.scss";
const HomePage = () => {
  const authContext = useContext(AuthContext);
  return (
    <div>
      {authContext.user && (
        <div className="home-wrapper">
          <h2>Logged in as</h2>
          <h3>
            {authContext.user.firstName} {authContext.user.lastName}
          </h3>
          <h3>{authContext.user.userName}</h3>
          <p>Use the navigation above to reach Users List or Active Chats</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
