import { Pagination } from "react-bootstrap";
import { PaginatedAuthor } from "../api/author/authorModel";

interface Props {
  authorData: PaginatedAuthor;
  pageNumber: number;
  setPageNumber: Function;
  pageSize: number;
  setPageSize: Function;
}

function PaginationComponent({
  authorData,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
}: Props) {
  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= authorData?.totalPages; number++) {
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
          {authorData?.hasPreviousPage && (
            <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} />
          )}

          {renderPaginationItems()}

          {authorData?.hasNextPage && (
            <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} />
          )}
        </Pagination>
      </div>
    </>
  );
}
export default PaginationComponent;
