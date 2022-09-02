import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Logo } from "../components";
import main from "../assets/images/nature-lake.png";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { user, logoutUser } = useAppContext();

  //what to show on landing if no user is logged in
  const DefaultInfo = () => {
    return (
      <>
        <h2>
          Monitor <span>real-time water data</span> in streams and rivers near
          you
        </h2>
        <p>
          Using data from the{" "}
          <a href="https://waterdata.usgs.gov/nwis">
            USGS National Water Information System
          </a>
          , you can view real-time stream flow and gage height data for rivers
          and streams around the United States.
        </p>
        <p>
          Create an account to save your favorite stations for easy monitoring,
          or jump right in.
        </p>
      </>
    );
  };

  //what to show on landing if user is logged in
  const UserInfo = () => {
    return (
      <>
        <h2>
          Hello, <span>{user.firstName}</span>.
          <br />
          Welcome back.
        </h2>
        <p>
          Using data from the{" "}
          <a
            href="https://waterdata.usgs.gov/nwis"
            target="_blank"
            rel="noopener noreferrer"
          >
            USGS National Water Information System
          </a>
          , you can view real-time stream flow and gage height data for rivers
          and streams around the United States.
        </p>
      </>
    );
  };

  return (
    <Styled>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          {!user ? <DefaultInfo /> : <UserInfo />}
          <div className="btn-container">
            <Link to="/dashboard" className="btn">
              {user ? "Go to map" : "Jump right in"}
            </Link>
            <Link
              to={user ? "/" : "/login"}
              className="btn btn-alt"
              onClick={user ? logoutUser : null}
            >
              {user ? "Logout" : "Login or Signup"}
            </Link>
          </div>
        </div>
        <img src={main} alt="nature lake" className="img main-img" />
      </div>
    </Styled>
  );
};

const Styled = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    .logo {
      width: 20em;
      max-width: var(--max-width);
    }
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    padding-top: 1rem;
    margin-top: -1rem;
  }
  .info {
    align-content: center;
  }
  h2 {
    font-weight: 500;
    span {
      color: var(--primary-600);
    }
  }
  p {
    color: var(--paragraph);
  }
  a {
    text-align: center;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
