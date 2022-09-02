import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAppContext } from "../context/appContext";
import { Loading, Fav, FormInputSelect, PageBtns } from "../components";

const Favorites = () => {
  const {
    getFavorites,
    favs,
    isLoading,
    totalFavs,
    sort,
    sortOptions,
    numOfPages,
    page,
    handleSort,
  } = useAppContext();

  useEffect(() => {
    //fetch favs on page render, and if page/sort options are changed by user
    getFavorites();
    //eslint-disable-next-line
  }, [page, sort]);

  const handleSortInput = (e) => {
    if (isLoading) return;
    handleSort(e.target.value);
  };

  const renderFavs = favs.map((fav) => {
    return <Fav key={fav._id} fav={fav} />;
  });

  if (isLoading) {
    return <Loading center />;
  }

  //handle no favorites
  if (favs.length === 0) {
    return (
      <Styled>
        <h4>No favorite sites yet</h4>
        <p style={{ textAlign: "center", maxWidth: "100%" }}>
          Visit the <Link to="/dashboard">map</Link> and find sites to add
          favorites!
        </p>
      </Styled>
    );
  }

  return (
    <Styled>
      <h4>Favorite Sites</h4>
      <div className="header">
        <div className="header-text">{`${totalFavs} total site${
          totalFavs > 1 ? "s" : ""
        }`}</div>
        <FormInputSelect
          name="sort"
          value={sort}
          options={sortOptions}
          labelText={`Sort by:`}
          handleChange={handleSortInput}
        />
      </div>
      {numOfPages > 1 && <PageBtns />}
      {renderFavs}
      {numOfPages > 1 && <PageBtns />}
    </Styled>
  );
};

const Styled = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--background);
  border-radius: var(--border-radius);
  border-top: 1px solid var(--gray-50);
  box-shadow: var(--shadow-2);
  min-width: 325px;
  h4 {
    margin-top: 0;
    text-align: center;
  }
  .header {
    display: grid;
    grid-template-columns: 1fr max-content max-content;
    grid-gap: 5px;
    justify-content: end;
    margin-left: 1rem;
    margin-right: 1rem;
    .header-text {
      grid-column: 1;
      display: flex;
      align-items: center;
    }
    label {
      grid-column: 2;
      display: flex;
      align-items: center;
    }
  }
`;

export default Favorites;
