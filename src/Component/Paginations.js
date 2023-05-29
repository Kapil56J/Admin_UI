

import { Pagination } from "react-bootstrap";

const Paginations = ({ currentPage, setPage, totalPages }) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const renderPaginationItem = (number) => {
    const isActive = number === currentPage;

    return (
      <Pagination.Item
        className={isActive ? "active" : ""}
        onClick={() => setPage(number)}
        key={number}
      >
        {number}
      </Pagination.Item>
    );
  };

  return (
    <Pagination className="float-md-center d-flex justify-content-center pt-2">
      <Pagination.First
        className={isFirstPage ? "disabled" : ""}
        onClick={() => setPage(1)}
      />
      <Pagination.Prev
        className={isFirstPage ? "disabled" : ""}
        onClick={() => setPage(currentPage - 1)}
      />

      {generatePageNumbers().map(renderPaginationItem)}

      <Pagination.Next
        className={isLastPage ? "disabled" : ""}
        onClick={() => setPage(currentPage + 1)}
      />
      <Pagination.Last
        className={isLastPage ? "disabled" : ""}
        onClick={() => setPage(totalPages)}
      />
    </Pagination>
  );
};

export default Paginations;
