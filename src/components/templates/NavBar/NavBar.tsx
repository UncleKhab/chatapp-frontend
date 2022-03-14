import React from "react";
import NavBarLink from "../../molecules/NavBarLink/NavBarLink";
import "./NavBar.scss";
const NavBar = () => {
  return (
    <nav className="nav-bar">
      <NavBarLink path="/home" label="Home" active={false} />
      <NavBarLink path="/users" label="Users" active={false} />
      <NavBarLink path="/chats" label="Chats" active={false} />
    </nav>
  );
};

export default NavBar;
