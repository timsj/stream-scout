import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAppContext } from "../context/appContext";
import {
  Loading,
  TimeSelect,
  Chart,
  ChartTitle,
  FavButton,
  Alert,
} from "../components";

const View = () => {
  const { isLoading, getSite, siteData, showAlert } = useAppContext();
  const [period, setPeriod] = useState("P1D");
  const { id } = useParams();

  useEffect(() => {
    getSite(id, period);
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  //check if retrieved siteData contains any data
  if (siteData.length === 0) {
    if (showAlert) {
      return <Alert />;
    }
    return (
      <p style={{ textAlign: "center", maxWidth: "100%" }}>
        No data available for this site.
      </p>
    );
  }

  //separate combined USGS data array into separate flow (q) and height (h) data
  let qData = siteData[0];
  let hData = siteData[1];

  //add error handling to check for undefined data before sending to Chart component
  if (!qData) {
    qData = {
      values: [{ value: [] }],
    };
  }

  if (!hData) {
    hData = {
      values: [{ value: [] }],
    };
  }

  return (
    <Styled>
      <div className="chart-title">
        <ChartTitle info={siteData} />
        <FavButton info={siteData} />
      </div>
      <div className="time-title text-small">Choose time period:</div>
      <TimeSelect period={period} setPeriod={setPeriod} />
      <div className="chart-container">
        <Chart chartData={qData} type="q" period={period} />
        <Chart chartData={hData} type="h" period={period} />
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  .chart-title {
    text-align: center;
    h5 {
      margin-bottom: 0;
    }
  }
  .fav-button {
  }
  .time-title {
    text-align: center;
  }
  .chart-container {
    width: var(--fluid-width);
    max-width: 900px;
    margin: 0 auto;
  }
`;

export default View;
