import { Pagination } from "react-bootstrap";

const Paginations = ({ currentPage, setPage, totalPages }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="float-md-center d-flex justify-content-center pt-2">
      <Pagination.First
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => setPage(1)}
      />
      <Pagination.Prev
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => setPage(currentPage - 1)}
      />

      {pageNumbers.map((number) => (
        <Pagination.Item
          className={number === currentPage ? "active" : ""}
          onClick={() => setPage(number)}
          key={number}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() => setPage(currentPage + 1)}
      />
      <Pagination.Last
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() => setPage(totalPages)}
      />
    </Pagination>
  );
};

export default Paginations;