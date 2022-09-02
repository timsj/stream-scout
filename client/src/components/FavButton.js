import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styled from "styled-components";

import { useAppContext } from "../context/appContext";
import FavLoading from "./FavLoading";

const FavButton = ({ info }) => {
  const {
    user,
    isFavLoading,
    isFavorite,
    setFavorite,
    addFavorite,
    checkFavorite,
    removeFavorite,
  } = useAppContext();

  const { id } = useParams();

  const { sourceInfo } = info[0];
  const agencyCode = sourceInfo.siteCode[0].agencyCode;
  const siteId = sourceInfo.siteCode[0].value;
  const siteName = sourceInfo.siteName;
  const latLng = [
    sourceInfo.geoLocation.geogLocation.latitude,
    sourceInfo.geoLocation.geogLocation.longitude,
  ].toString();

  useEffect(() => {
    if (user) {
      checkFavorite(id);
      //checkFavorite with param id to avoid instances where...
      //...siteId hasn't yet updated from previously viewed site
    }
    return () => {
      setFavorite(false);
    };
    //eslint-disable-next-line
  }, []);

  const handleClick = ({ siteId, agencyCode, siteName, latLng }) => {
    if (!isFavorite) {
      addFavorite({ siteId, agencyCode, siteName, latLng });
    } else {
      removeFavorite(siteId);
    }
  };

  if (!user) {
    return (
      <Styled>
        <>
          <MdFavoriteBorder className="icon" />
          <Link to="/login " className="text text-small">
            Login to favorite this site
          </Link>
        </>
      </Styled>
    );
  }

  if (isFavLoading) {
    return <FavLoading center />;
  }

  return (
    <Styled>
      <button
        type="button"
        onClick={() => handleClick({ siteId, agencyCode, siteName, latLng })}
        disabled={isFavLoading}
      >
        {isFavorite ? (
          <>
            <MdFavorite className="icon" />
            <div className="text text-small">Click to unsave site</div>
          </>
        ) : (
          <>
            <MdFavoriteBorder className="icon" />
            <div className="text text-small">Click to save site</div>
          </>
        )}
      </button>
    </Styled>
  );
};

const Styled = styled.div`
  .icon,
  .text {
    color: var(--tertiary);
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
  .text {
    margin-left: 0.25rem;
  }
  button {
    background: transparent;
    border: transparent;
  }
`;

export default FavButton;
