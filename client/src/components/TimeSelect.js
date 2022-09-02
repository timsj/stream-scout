import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAppContext } from "../context/appContext";

const TimeSelect = ({ period, setPeriod }) => {
  const { getSite } = useAppContext();
  const { id } = useParams();

  //option names are in ISO-8601 duration format (per USGS API syntax)
  const periodOptions = [
    { name: "P1D", text: "1d" },
    { name: "P7D", text: "7d" },
    { name: "P30D", text: "30d" },
    { name: "P60D", text: "60d" },
    { name: "P90D", text: "90d" },
  ];

  const changePeriod = (newPeriod) => {
    setPeriod(newPeriod);
    getSite(id, newPeriod);
  };

  const renderBtns = periodOptions.map((option, i) => {
    return (
      <button
        type="button"
        key={i}
        className={period === option.name ? "time-btn active" : "time-btn"}
        onClick={() => changePeriod(option.name)}
      >
        {option.text}
      </button>
    );
  });

  return (
    <Styled>
      <div className="btn-group">{renderBtns}</div>
    </Styled>
  );
};

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .time-btn {
    background: var(--primary-100);
    border: 1px solid var(--primary-500);
    color: var(--primary-600);
    padding: 5px 12px;
    box-shadow: 0 4px 8px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    margin-bottom: 1rem;
    cursor: pointer;
    float: left;
  }
  .btn-group button:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }
  .btn-group button:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
    margin-left: -1px;
  }
  .btn-group button:not(:last-child) {
    border-right: none;
  }
  .active,
  .time-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
  .btn-group button:only-child {
    border-radius: 0.25rem;
    margin-left: 0;
  }
`;

export default TimeSelect;
