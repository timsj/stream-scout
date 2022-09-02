import React from "react";
import { RiMenuLine } from "react-icons/ri";

const MenuButton = ({ btnClass, handleMenuClick }) => {
  return (
    <button
      type="button"
      className={btnClass}
      onClick={() => handleMenuClick()}
    >
      <span className="text">Menu</span>
      <RiMenuLine />
    </button>
  );
};

export default MenuButton;
