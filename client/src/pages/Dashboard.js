import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { NavBar } from "../components";

//base dashboard page, using React-Router Outlet to render different pages under the navbar
const Dashboard = () => {
  return (
    <Styled>
      <div>
        <NavBar />
        <div className="dashboard-page">
          <Outlet />
        </div>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
`;

export default Dashboard;
