import React, { useState } from "react";
import styled from "styled-components";

import { useAppContext } from "../context/appContext";
import { FormInput, Alert } from "../components";

const Profile = () => {
  const { user, showAlert, displayInputAlert, isLoading, updateUser } =
    useAppContext();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);

  const onSubmit = (e) => {
    e.preventDefault();

    //front-end validation
    if (!firstName || !lastName || !email) {
      displayInputAlert();
      return;
    }
    updateUser({ firstName, lastName, email });
  };

  return (
    <Styled>
      <form className="form" onSubmit={onSubmit}>
        <h4>Update Profile</h4>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormInput
            type="text"
            name="firstName"
            labelText="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormInput
            type="text"
            name="lastName"
            labelText="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormInput
            type="email"
            name="email"
            labelText="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Styled>
  );
};

const Styled = styled.section`
  width: 100%;
  max-width: var(--fixed-width);
  margin: 0 auto;
  padding: 2rem;
  background: var(--white);
  border-radius: var(--border-radius);
  border-top: 1px solid var(--gray-50);
  box-shadow: var(--shadow-2);
  h4 {
    margin-top: 0;
    text-align: center;
  }
  .form {
    margin: 0;
    border: transparent;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
`;

export default Profile;
