import { useState, FC, useEffect, SetStateAction } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  useDeleteAuthorMutation,
  useGetByPageMutation,
} from "../../api/author/authorApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppRoutes } from "../../routes/AppRoutes";
import { MdOutlineEditNote, MdDeleteForever } from "react-icons/md";
import DeleteModal from "../../components/DeleteModal";
import { Author } from "../../api/author/authorModel";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination";
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
const Authors: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [deleteAuthor] = useDeleteAuthorMutation();
  const [pageNumber, setPageNumber] = useState<number>(
    searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1
  );
  const [pageSize, setPageSize] = useState<number>(
    searchParams.get("size") ? parseInt(searchParams.get("size")!) : 10
  );
  const [getAuthorData, { data, error, isLoading }] = useGetByPageMutation();
  const [authorToDelete, setAuthorToDelete] = useState<Author | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchAuthorData = async (
    pageNumber: number,
    pageSize: number,
    searchTerm: string | null
  ) => {
    await getAuthorData({ pageNumber, pageSize, searchTerm: searchTerm ?? "" });
  };

  useEffect(() => {
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;
    const size = searchParams.get("size")
      ? parseInt(searchParams.get("size")!)
      : 10;
    const searchTerm = searchParams.get("searchTerm");
    fetchAuthorData(page, size, searchTerm);
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
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serial #</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((author: Author, index) => (
                <tr key={author.id}>
                  <td>{pageNumber * pageSize + (index + 1 - pageSize)}</td>
                  <td>{author.name}</td>
                  <td>{author.email}</td>
                  <td>{new Date(author.dateOfBirth).toDateString()}</td>
                  <td>
                    <Button
                      style={{ marginRight: "3%" }}
                      onClick={() =>
                        navigate(AppRoutes.author.update.route(author.id))
                      }
                    >
                      <MdOutlineEditNote size={25} />
                    </Button>
                    <Button
                      onClick={() => {
                        setAuthorToDelete(author);
                      }}
                    >
                      <MdDeleteForever size={25} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {authorToDelete !== undefined && (
        <DeleteModal
          title="Delete Author?"
          show={authorToDelete !== undefined}
          onConfirm={() => {
            deleteAuthor(authorToDelete.id).then(() => {
              toast.success("Author Deleted Successfully");
              setAuthorToDelete(undefined);
            });
          }}
          onCancel={() => {
            setAuthorToDelete(undefined);
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
export default Authors;
