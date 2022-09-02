import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";

const About = () => {
  return (
    <Styled>
      <h4>About</h4>
      <p>
        StreamScout is a website that allows users to view real-time USGS stream
        flow and gage height data for rivers and streams around the United
        States. The data shown on this site is for informational purposes only
        and is subject to the{" "}
        <a
          href="https://help.waterdata.usgs.gov/policies/provisional-data-statement"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          provisional data statement
        </a>{" "}
        provided by the USGS.
      </p>
      <p>
        This project was created with the free & open source data providers and
        technologies listed below. Thank you!
      </p>
      <br />
      <h5>Data providers</h5>
      <div className="title-underline" />
      <ul>
        <li>
          <a
            href="https://waterdata.usgs.gov/nwis"
            target="_blank"
            rel="noopener noreferrer"
          >
            USGS NWIS
          </a>{" "}
          | real-time stream data
        </li>
        <li>
          <a
            href="https://www.openstreetmap.org/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </a>{" "}
          | map data & tile provider
        </li>
        <li>
          <a
            href="https://nominatim.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OSM Nominatim
          </a>{" "}
          | geocoding search service
        </li>
      </ul>
      <br />
      <h5>Software and libraries</h5>
      <div className="title-underline" />
      <ul>
        <li>
          <a
            href="https://leafletjs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leaflet
          </a>{" "}
          | JS library for interactive maps
        </li>
        <li>
          <a
            href="https://www.chartjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chart.js
          </a>{" "}
          | JS library for creating charts
        </li>
        <li>
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>{" "}
          | front-end JS library for user interface
        </li>
        <li>
          <a
            href="https://expressjs.com//"
            target="_blank"
            rel="noopener noreferrer"
          >
            Express
          </a>{" "}
          | back-end Node.js web framework
        </li>
        <li>
          <a
            href="https://mongoosejs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mongoose
          </a>{" "}
          | ODM library for Node/MongoDB
        </li>
        <li>
          <a
            className="repo"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project repo on Github&nbsp; <FaGithub />
          </a>{" "}
        </li>
      </ul>
    </Styled>
  );
};

const Styled = styled.main`
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.5rem;
  h5 {
    margin-bottom: 0;
  }
  .title-underline {
    width: 85vw;
    max-width: 1050px;
    height: 0.25rem;
    background-color: var(--primary-600);
    margin-top: 0.25rem;
  }
  .repo {
    display: flex;
    align-items: center;
  }
`;

export default About;
