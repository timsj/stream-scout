import React from "react";
import { Link } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa";

const BackButton = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="btn"
      style={{ marginRight: "0.5em", paddingLeft: "0.25em" }}
    >
      <FaCaretLeft />
      <span className="text">{text || ""}</span>
    </Link>
  );
};

export default BackButton;
