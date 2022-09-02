import React from "react";

const FavLoading = ({ center }) => {
  return (
    <div
      className={center ? "fav-loading loading-center" : "fav-loading"}
    ></div>
  );
};

export default FavLoading;
