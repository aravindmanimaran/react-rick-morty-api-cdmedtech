import React from "react";

const Pagination = ({ prev, next, onPrevious, onNext }) => {
  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <nav className="white">
      <ul className="pagination">
        {prev ? (
          <li className="page-item">
            <button
              className="page-link green-text btn-flat"
              onClick={handlePrevious}
            >
              {`< Previous`}
            </button>
          </li>
        ) : null}
        {next ? (
          <li className="page-item">
            <button
              className="page-link green-text btn-flat"
              onClick={handleNext}
            >
              {`Next >`}
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Pagination;
