import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  MapContainer,
  TileLayer,
  ScaleControl,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import { useAppContext } from "../context/appContext";
import { Alert } from "../components";

const Map = () => {
  const {
    positionZoom,
    boundingBox,
    getSites,
    sites,
    changePositionZoom,
    showAlert,
  } = useAppContext();

  //create map search bar component
  const MapSearch = () => {
    const map = useMap();

    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider({
          params: {
            //limit searches to United States
            countrycodes: "us",
          },
        }),
        style: "bar",
        searchLabel: "Enter US location or zoom in",
        autoCompleteDelay: 750,
        showMarker: false,
      });

      map.addControl(searchControl);

      //need to cleanup useEffect to avoid duplicate bars on map
      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  };

  //create component to dynamically update map bounds and fetch sites
  const MapBounds = () => {
    const map = useMapEvent("moveend", () => {
      const bounds = map.getBounds();
      const newPosition = map.getCenter();
      const newZoom = map.getZoom();

      changePositionZoom({ p: newPosition, z: newZoom });

      //convert bounding points to USGS API required format
      boundingBox[0] = bounds._southWest.lng.toFixed(6);
      boundingBox[1] = bounds._southWest.lat.toFixed(6);
      boundingBox[2] = bounds._northEast.lng.toFixed(6);
      boundingBox[3] = bounds._northEast.lat.toFixed(6);

      //prevent fetching sites until zoom level 10
      if (newZoom >= 10) {
        //timeout to delay too frequent fetches
        setTimeout(() => {
          getSites();
        }, 750);
      }
    });

    return null;
  };

  return (
    <Styled>
      {showAlert && <Alert />}
      <MapContainer
        center={positionZoom.p}
        zoom={positionZoom.z}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ScaleControl metric={false} updateWhenIdle />
        <MapSearch />
        <MapBounds />
        {sites.map((site) => {
          let lat = site.sourceInfo.geoLocation.geogLocation.latitude;
          let lng = site.sourceInfo.geoLocation.geogLocation.longitude;
          return (
            <Marker key={site.name} position={[lat, lng]}>
              <Popup autoPan={false}>
                {/* very important to keep popup autoPan false to avoid constant fetching */}
                <span className="popup-span">Site Name:</span>{" "}
                {site.sourceInfo.siteName}
                <br />
                <span className="popup-span">Site Code:</span>{" "}
                {site.sourceInfo.siteCode[0].value}
                <br />
                <span className="popup-span">Current Streamflow:</span>{" "}
                {site.values[0].value[0].value} cfs
                <br />
                <br />
                <Link
                  to={`view/${site.sourceInfo.siteCode[0].value}`}
                  className="popup-btn"
                >
                  View detailed information
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Styled>
  );
};

const Styled = styled.section`
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.5rem;
  background: var(--background);
  border-radius: var(--border-radius);
  border-top: 1px solid var(--gray-50);
  box-shadow: var(--shadow-2);
`;

export default Map;
