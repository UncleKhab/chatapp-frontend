import React from "react";
import IUserModel from "../../../_core/models/IUserModel";
import NewChatButton from "../../molecules/NewChatButton/NewChatButton";
import "./UserListItem.scss";

interface Props {
  userData: IUserModel;
}
const UserListItem: React.FC<Props> = (props) => {
  const { userData } = props;
  const members: string[] = [userData.id];

  return (
    <li className="user-item">
      <div className="user-item__detail">
        <label>Name:</label>
        <p>
          {userData.firstName} {userData.lastName}
        </p>
      </div>
      <div className="user-item__detail">
        <label>Username:</label>
        <p>{userData.userName}</p>
      </div>
      <div className="user-item__detail">
        <label>Email:</label>
        <p>{userData.email}</p>
      </div>
      <div className="user-item__detail">
        <label>Phone Number:</label>
        <p>{userData.phoneNumber}</p>
      </div>

      <NewChatButton members={members} />
    </li>
  );
};

export default UserListItem;
