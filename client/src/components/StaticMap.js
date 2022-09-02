import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styled from "styled-components";

const StaticMap = ({ latLng, zoom }) => {
  //takes latLng string from db and converts it into array usable by Map
  const center = latLng.split(",").map((el) => parseFloat(el));

  //options required by leaflet to show static map
  const options = {
    attributionControl: false,
    zoomControl: false,
    closePopupOnClick: false,
    boxZoom: false,
    doubleClickZoom: false,
    dragging: false,
    zoomSnap: false,
    zoomDelta: false,
    trackResize: false,
    touchZoom: false,
    scrollWheelZoom: false,
  };

  return (
    <Styled>
      <MapContainer center={center} zoom={zoom} {...options}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} interactive={false} />
      </MapContainer>
    </Styled>
  );
};

const Styled = styled.div`
  width: 166px;
  padding: 0.5rem;
  background: var(--white);
  border-radius: var(--border-radius);
  border-top: 1px solid var(--gray-50);
  box-shadow: var(--shadow-2);
  .leaflet-container {
    height: 150px;
    width: 150px;
    z-index: 0;
  }
`;

export default StaticMap;
