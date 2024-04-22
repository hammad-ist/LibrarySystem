import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useGetByPageBookMutation } from "../../api/book/bookApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppRoutes } from "../../routes/AppRoutes";
import Card from "react-bootstrap/Card";
import { Book } from "../../api/book/bookModel";
import { useDeleteBookMutation } from "../../api/book/bookApi";
import { FC, useEffect, useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination";
import { MdOutlineEditNote, MdDeleteForever } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";

const pageSizeList = [
  {
    id: 1,
    value: "10",
  },
  {
    id: 2,
    value: "20",
  },
  {
    id: 3,
    value: "50",
  },
];
const Books: FC = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [deleteBook] = useDeleteBookMutation();
  const [bookToDelete, setBookToDelete] = useState<Book | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState<number>(
    searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1
  );
  const [pageSize, setPageSize] = useState<number>(
    searchParams.get("size") ? parseInt(searchParams.get("size")!) : 10
  );
  const [getBookData, { data, error, isLoading }] = useGetByPageBookMutation();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchBookData = async (
    pageNumber: number,
    pageSize: number,
    searchTerm: string | null
  ) => {
    await getBookData({ pageNumber, pageSize, searchTerm: searchTerm ?? "" });
  };

  useEffect(() => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const size = searchParams.get("size")
      ? parseInt(searchParams.get("size")!)
      : 10;
    const searchTerm = searchParams.get("searchTerm");
    fetchBookData(page, size, searchTerm);
  }, [searchParams]);

  const handleSearchClick = () => {
    searchParams.set("searchTerm", searchTerm);
    setSearchParams(searchParams);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = event.target.value;

    searchParams.set("size", selectedSize);
    searchParams.set("page", "1");
    setPageNumber(1);

    setSearchParams(searchParams);

    setPageSize(parseInt(selectedSize));
  };

  // just a practice to remember
  //const [user, setUser] = useState({ firstName: "", lastName: "" });

  // const handleChange = (e, propertyName)=>{
  //   setUser({...user, propertyName: e.target.value});
  // }

  return (
    <Container>
      <Row style={{ marginBottom: "10px", marginTop: "10px" }}>
        <Col
          md={{ span: 4 }}
          style={{ display: "flex", justifyContent: "right" }}
        >
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <Button variant="outline-success" onClick={handleSearchClick}>
            Search
          </Button>
        </Col>
        <Col
          md={{ span: 2, offset: 6 }}
          style={{ display: "flex", justifyContent: "right" }}
        >
          <Button
            style={{}}
            onClick={() => {
              navigate(AppRoutes.author.create);
            }}
          >
            <IoAddCircleOutline size={25} />
            Create
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Container>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <Container>
          <Row>
            {data?.items.map((book: Book, index) => (
              <Card key={book.id} style={{ width: "18rem", margin: "1%" }}>
                <Container style={{ height: "75%" }}>
                  <Card.Body>
                    <Card.Header>
                      {pageNumber * pageSize + (index + 1 - pageSize)}
                    </Card.Header>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {book.isbn}
                    </Card.Subtitle>
                    <Card.Text>{book.authorName}</Card.Text>
                  </Card.Body>
                </Container>
                <Container style={{ height: "25%" }}>
                  <Button
                    style={{ marginRight: "3%" }}
                    onClick={() => {
                      setBookToDelete(book);
                    }}
                  >
                    <MdDeleteForever size={25} />
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(AppRoutes.book.update.route(book.id));
                    }}
                  >
                    <MdOutlineEditNote size={25} />
                  </Button>
                </Container>
              </Card>
            ))}
          </Row>
        </Container>
      )}
      {bookToDelete !== undefined && (
        <DeleteModal
          title="Delete Book?"
          show={bookToDelete !== undefined}
          onConfirm={() => {
            deleteBook(bookToDelete.id).then(() => {
              toast.success("Book Deleted Successfully");
              setBookToDelete(undefined);
            });
          }}
          onCancel={() => {
            setBookToDelete(undefined);
          }}
        ></DeleteModal>
      )}
      <Container style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            width: "10%",
            height: "10%",
          }}
        >
          <Form.Select
            onChange={handleSelectChange}
            value={pageSize.toString()}
          >
            {pageSizeList.map((x) => (
              <option key={x.id}>{x.value}</option>
            ))}
          </Form.Select>
        </div>
        <div style={{ width: "80%" }}>
          {data && (
            <PaginationComponent
              data={data}
              pageNumber={pageNumber}
              setPageNumber={(page: number) => {
                searchParams.set("page", page.toString());
                setSearchParams(searchParams);
                setPageNumber(page);
              }}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          )}
        </div>
      </Container>
    </Container>
  );
};
export default Books;
