import { useState, FC, useEffect } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import {
  useDeleteAuthorMutation,
  useGetAllQuery,
  useGetByPageMutation,
} from "../../api/author/authorApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppRoutes } from "../../routes/AppRoutes";
import EditTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddCircleOutline from "@mui/icons-material/PersonAdd";
import DeleteModal from "../../components/DeleteModal";
import { Author, PaginatedAuthor } from "../../api/author/authorModel";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/Pagination";

const Authors: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [deleteAuthor] = useDeleteAuthorMutation();
  const [pageNumber, setPageNumber] = useState<number>(
    searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1
  );
  const [pageSize, setPageSize] = useState<number>(10);
  const [getAuthorData, { data, error, isLoading }] = useGetByPageMutation();
  const [authorToDelete, setAuthorToDelete] = useState<Author | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchAuthorData = async () => {
      await getAuthorData({ pageNumber, pageSize });
    };
    fetchAuthorData();
  }, [pageNumber, pageSize]);

  const navigate = useNavigate();
  return (
    <Container>
      <div style={{ display: "flex", marginTop: "1%", marginBottom: "1%" }}>
        <Button
          style={{ marginLeft: "auto" }}
          onClick={() => {
            navigate(AppRoutes.author.create);
          }}
        >
          <AddCircleOutline />
          Create
        </Button>
      </div>

      {isLoading ? (
        <Container>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((author: Author) => (
              <tr key={author.id}>
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
                    <EditTwoToneIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthorToDelete(author);
                    }}
                  >
                    <DeleteForeverTwoToneIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
      {data && (
        <PaginationComponent
          authorData={data}
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
    </Container>
  );
};
export default Authors;
