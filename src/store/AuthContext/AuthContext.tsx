import React, { createContext, useState, useEffect } from "react";
import IAuthContext from "../../_core/models/IAuthContext";
import IUserModel from "../../_core/models/IUserModel";

const defaultState: IAuthContext | undefined = undefined;

const REFRESH_TIME_MS = 1000 * 60 * 5;
const API_URL = process.env.REACT_APP_API_URL;
export const AuthContext = createContext<IAuthContext | undefined>(
  defaultState
);

export const AuthContextProvider: React.FC = (props) => {
  const [userData, setUserData] = useState<IUserModel | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const handleLogin = (user: IUserModel, token: string): void => {
    setUserData(user);
    setToken(token);
  };
  const handleLogout = () => {
    setUserData(undefined);
    setToken(undefined);
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => handleTokenRefresh(token), REFRESH_TIME_MS);
    }
  }, [token]);

  const handleTokenRefresh = (providedToken: string) => {
    const requestBody = {
      token: providedToken,
    };
    fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setToken(data.accessToken);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const contextValue: IAuthContext = {
    user: userData,
    accessToken: token,
    login: handleLogin,
    logout: handleLogout,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
