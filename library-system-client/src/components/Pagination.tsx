import { Pagination } from "react-bootstrap";
import { PaginatedAuthor } from "../api/author/authorModel";
import { PaginatedBook } from "../api/book/bookModel";

interface Props {
  data: PaginatedAuthor | PaginatedBook;
  pageNumber: number;
  setPageNumber: Function;
  pageSize: number;
  setPageSize: Function;
}

function PaginationComponent({
  data,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
}: Props) {
  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= data?.totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === pageNumber}
          onClick={() => setPageNumber(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination>
          {data?.hasPreviousPage && (
            <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} />
          )}

          {renderPaginationItems()}

          {data?.hasNextPage && (
            <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} />
          )}
        </Pagination>
      </div>
    </>
  );
}
export default PaginationComponent;
