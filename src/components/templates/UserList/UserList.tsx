import React, { useContext, useEffect, useState } from "react";
import "./UserList.scss";
import { AuthContext } from "../../../store/AuthContext/AuthContext";
import IUserModel from "../../../_core/models/IUserModel";
import UserListItem from "../../organisms/UserListItem/UserListItem";

const API_URL = process.env.REACT_APP_API_URL;

const UserList = () => {
  const authContext = useContext(AuthContext);
  const [users, setUsers] = useState<IUserModel[]>([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${authContext?.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((usersData) => {
        const newUserlist = removeCurrentUser(usersData);
        setUsers(newUserlist);
        return usersData;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  const removeCurrentUser = (userList: IUserModel[]) => {
    let newUserList = userList;
    const currentUserIndex = newUserList?.findIndex(
      (user) => user.id === authContext?.user?.id
    );
    newUserList.splice(currentUserIndex, 1);
    return newUserList;
  };

  return (
    <ul className="user-list">
      {users?.map((user) => (
        <UserListItem key={`${user.id}`} userData={user} />
      ))}
    </ul>
  );
};

export default UserList;
