import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAppContext } from "../context/appContext";
import { Logo, FormInput, Alert } from "../components";

const Login = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    signedUp: true,
  };

  const [formValues, setFormValues] = useState(initialState);

  const {
    isLoading,
    showAlert,
    displayInputAlert,
    registerUser,
    loginUser,
    user,
  } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    //dynamically redirect user to dashboard on successful login
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    //ensure form data is controlled by React
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, signedUp } = formValues;
    //front-end validation
    if (
      !email ||
      !password ||
      (!signedUp && !firstName) ||
      (!signedUp && !lastName)
    ) {
      displayInputAlert();
      return;
    }

    const currentUser = { firstName, lastName, email, password };
    if (signedUp) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  return (
    <Styled className="full-page">
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <Link to="/">
          <Logo />
        </Link>
        <h5>{formValues.signedUp ? "Login" : "Sign Up"}</h5>
        {showAlert && <Alert />}
        {!formValues.signedUp && (
          <React.Fragment>
            <FormInput
              type="text"
              name="firstName"
              labelText="First Name"
              value={formValues.firstName}
              onChange={handleChange}
            />
            <FormInput
              type="text"
              name="lastName"
              labelText="Last Name"
              value={formValues.lastName}
              onChange={handleChange}
            />
          </React.Fragment>
        )}
        <FormInput
          type="email"
          name="email"
          labelText="Email"
          value={formValues.email}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          name="password"
          value={formValues.password}
          labelText="Password"
          onChange={handleChange}
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {!formValues.signedUp ? "Sign Up" : "Login"}
        </button>
        <p>
          {!formValues.signedUp
            ? "Already signed up?"
            : "Haven't signed up yet?"}
          <button
            className="signup-btn"
            type="button"
            onClick={() => {
              setFormValues({ ...formValues, signedUp: !formValues.signedUp });
            }}
          >
            {!formValues.signedUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </form>
    </Styled>
  );
};

const Styled = styled.div`
  display: grid;
  align-items: center;
  background: var(--alt-background);
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
    width: 12em;
  }
  .form {
    max-width: 400px;
  }

  h5 {
    text-align: center;
    color: var(--primary-600);
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .signup-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default Login;
