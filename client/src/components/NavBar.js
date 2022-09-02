import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import Logo from "./Logo";
import BackButton from "./BackButton";
import MenuButton from "./MenuButton";
import MenuItems from "./MenuItems";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null); //need to access DOM to handle menu clicks
  const { id } = useParams();

  useEffect(() => {
    //enables ability for user to click outside of menu to hide menu
    document.addEventListener("mousedown", handleClickOutside);
    //cleanup function
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  return (
    <Styled>
      <div className="nav">
        <Link to="/">
          <Logo />
        </Link>
        <div className="nav-btns">
          {id ? <BackButton to="/dashboard" text="Map" /> : ""}
          <div className="drop-container" ref={dropdownRef}>
            <MenuButton
              btnClass={`btn ${showMenu ? ` btn-hover-active` : ` btn-alt`}`}
              handleMenuClick={handleMenuClick}
            />
            <div className={`dropdown ${showMenu ? `show-dropdown` : ``}`}>
              <MenuItems handleMenuClick={handleMenuClick} />
            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
};

const Styled = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    padding-top: 0.5rem;
    width: 10em;
  }
  .nav {
    display: flex;
    width: 90vw;
    max-width: var(--max-width);
    align-items: center;
    justify-content: space-between;
  }
  .nav-btns {
    display: flex;
    justify-content: flex-end;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .drop-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    line-height: 1.75;
  }
  .btn-hover-active {
    color: var(--primary-200);
    background-color: var(--primary-800);
  }
  .dropdown {
    position: absolute;
    top: 3em;
    right: 0;
    min-width: 100%;
    text-align: left;
    box-shadow: var(--shadow-4);
    visibility: hidden;
    border-radius: var(--border-radius);
    z-index: 1;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown a:first-child {
    border-radius: 0.25rem 0.25rem 0 0;
  }
  .dropdown a:last-child {
    border-radius: 0 0 0.25rem 0.25rem;
  }
  .dropdown a:only-child {
    border-radius: 0.25rem;
  }
  .dropdown-btn {
    display: inline-block;
    width: 100%;
    min-width: 13rem;
    color: var(--primary-200);
    background: var(--primary-800);
    border: 1px solid var(--primary-800);
    padding: 0.5rem;
    cursor: pointer;
  }
  .dropdown-btn:hover {
    color: var(--button-text);
    background: var(--primary-700);
  }
  .icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 1.5em;
    margin-left: 0.5rem;
  }
`;

export default NavBar;
