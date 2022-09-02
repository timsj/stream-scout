import React from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useAppContext } from "../context/appContext";

const PageBtns = () => {
  const { numOfPages, page, changePage } = useAppContext();

  //logic for prev/next page buttons
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };

  //iterate through page buttons based on numOfPages global state
  let pages = [];
  for (let i = 0; i <= numOfPages - 1; i++) {
    pages[i] = i + 1;
  }

  const renderPageBtns = pages.map((pageNum) => {
    return (
      <button
        type="button"
        className={pageNum === page ? "page-btn active" : "page-btn"}
        key={pageNum}
        onClick={() => changePage(pageNum)}
      >
        {pageNum}
      </button>
    );
  });

  return (
    <Styled>
      <button className="prev-btn" onClick={() => prevPage()}>
        <FaChevronLeft />
      </button>
      <div className="btn-group">{renderPageBtns}</div>
      <button className="next-btn" onClick={() => nextPage()}>
        <FaChevronRight />
      </button>
    </Styled>
  );
};

const Styled = styled.section`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 300px;
  .prev-btn,
  .next-btn {
    width: 45px;
    height: 35px;
    background: var(--white);
    border-color: transparent;
    border-radius: var(--border-radius);
    color: var(--primary-500);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
  .page-btn {
    background: var(--primary-100);
    border: 1px solid var(--primary-500);
    width: 45px;
    height: 35px;
    color: var(--primary-600);
    transition: var(--transition);
    cursor: pointer;
    box-shadow: 0 4px 8px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
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
  .page-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
  .btn-group button:only-child {
    border-radius: 0.25rem;
    margin-left: 0;
  }
`;

export default PageBtns;
