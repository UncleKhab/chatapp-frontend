import UserList from "../../components/templates/UserList/UserList";
import "./UsersPage.scss";
const UsersPage = () => {
  return (
    <div className="users-page-wrapper">
      <h2>Available Users</h2>
      <UserList />
    </div>
  );
};

export default UsersPage;
