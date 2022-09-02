import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

import { useAppContext } from "../context/appContext";
import { Loading, StaticMap } from "./";

const Fav = ({ fav }) => {
  const { isLoading, removeFavorite, changePositionZoom, getSites } =
    useAppContext();
  const { siteId, siteName, latLng, agencyCode, createdAt } = fav;
  const navigate = useNavigate();

  const handleMapClick = () => {
    const positionZoom = {
      //takes latLng string from db and converts it into array usable by Map
      p: latLng.split(",").map((el) => parseFloat(el)),
      z: 14,
    };

    //create bounding box around the fav site to send to USGS API via getSites()
    const favBox = String([
      (positionZoom.p[1] - 0.001).toFixed(6), //SW lng
      (positionZoom.p[0] - 0.001).toFixed(6), //SW lat
      (positionZoom.p[1] + 0.001).toFixed(6), //NE lng
      (positionZoom.p[0] + 0.001).toFixed(6), //NE lat
    ]);

    changePositionZoom(positionZoom);
    getSites(favBox);
    navigate("/dashboard");
  };

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <Styled>
      <div className="info">
        <h5>{siteName}</h5>
        <a
          href={`https://waterdata.usgs.gov/nwis/inventory/?site_no=${siteId}&agency_cd=${agencyCode}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {agencyCode} Site No. {siteId}
        </a>
        <p className="text-small">
          Added: {dayjs(createdAt).format("MMM DD, YYYY, h:mm a")}
        </p>
      </div>
      <div className="static-map" onClick={() => handleMapClick()}>
        <StaticMap latLng={latLng} zoom={10} />
      </div>
      <div className="btn-container">
        <button
          className="btn btn-red btn-block"
          onClick={() => removeFavorite(siteId, "reload")}
        >
          Remove
        </button>
        <Link to={`/dashboard/view/${siteId}`} className="btn btn-block">
          View Data
        </Link>
      </div>
    </Styled>
  );
};

const Styled = styled.article`
  display: grid;
  grid-template-rows: 1fr min-content;
  grid-template-columns: 1fr;
  background: var(--gray-100);
  border-radius: var(--border-radius);
  border-top: 1px solid var(--gray-50);
  box-shadow: var(--shadow-2);
  margin: 1em;
  padding: 1em;
  text-align: center;
  h5 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  .info,
  .static-map,
  .btn-container {
    display: inline-grid;
    justify-items: center;
  }

  .static-map {
    grid-row: span 2;
    cursor: pointer;
  }

  .btn-container {
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1em;
    justify-self: center;
    margin-top: 1em;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr min-content;
  }
`;

export default Fav;
