import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import error from "../assets/images/404error.svg";

//handle 404 error
const Error = () => {
  return (
    <Styled className="full-page">
      <div>
        <img src={error} alt="404 not found" />
        <h3>Page not found</h3>
        <p>We couldn't find the page you were looking for.</p>
        <Link to="/" className="btn btn-alt">
          Go back home
        </Link>
      </div>
    </Styled>
  );
};

const Styled = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80vw;
    display: block;
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    max-width: 100em;
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--grey-500);
  }
`;

export default Error;
