import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";
import { MdLogin, MdLogout, MdFavorite } from "react-icons/md";

import { useAppContext } from "../context/appContext";

const MenuItems = ({ handleMenuClick }) => {
  const { user, logoutUser } = useAppContext();

  //default menu items (no user logged in)
  const items = [
    {
      id: 0,
      text: "Login or Signup",
      class: "dropdown-btn",
      path: "/login",
      icon: <MdLogin />,
    },
    {
      id: 1,
      text: "Map",
      class: "dropdown-btn",
      path: "/dashboard",
      icon: <FaMapMarkedAlt />,
    },
    {
      id: 2,
      text: "About",
      class: "dropdown-btn",
      path: "about",
      icon: <FaInfoCircle />,
    },
  ];

  //menu items to display when logged in
  const loggedInItems = [
    {
      id: 1,
      text: "Profile",
      class: "dropdown-btn logged-in",
      path: "profile",
      icon: <FaUser />,
    },
    {
      id: 2,
      text: "Favorites",
      class: "dropdown-btn",
      path: "favorites",
      icon: <MdFavorite />,
    },
    {
      id: 3,
      text: "Map",
      class: "dropdown-btn",
      path: "/dashboard",
      icon: <FaMapMarkedAlt />,
    },
    {
      id: 4,
      text: "About",
      class: "dropdown-btn",
      path: "about",
      icon: <FaInfoCircle />,
    },
    {
      id: 5,
      text: "Logout",
      class: "dropdown-btn logged-in",
      path: "/",
      icon: <MdLogout />,
    },
  ];

  let renderedItems = items.map((item) => {
    return (
      <Link
        to={item.path}
        key={item.id}
        className={item.class}
        onClick={handleMenuClick}
      >
        <i className="icon">{item.icon}</i>
        {item.text}
      </Link>
    );
  });

  if (user) {
    renderedItems = loggedInItems.map((item) => {
      return (
        <Link
          to={item.path}
          key={item.id}
          className={item.class}
          onClick={item.text === "Logout" ? logoutUser : handleMenuClick}
        >
          <i className="icon">{item.icon}</i>
          {item.text}
        </Link>
      );
    });
  }

  return <>{renderedItems}</>;
};

export default MenuItems;
