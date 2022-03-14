import React from "react";
import { Link } from "react-router-dom";
import "./NavBarLink.scss";
interface Props {
  label: string;
  path: string;
  active: boolean;
}
const NavBarLink: React.FC<Props> = (props) => {
  const { label, path, active } = props;
  return (
    <Link to={path} className="nav-bar-link">
      <span className={` ${active ? "active" : ""}`}>{label}</span>
    </Link>
  );
};

export default NavBarLink;
