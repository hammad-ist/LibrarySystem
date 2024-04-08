import React, { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import {
  useDeleteAuthorMutation,
  useGetAllQuery,
} from "../../api/author/authorApi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { appRoutes } from "../../routes/Routes";
import EditTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddCircleOutline from "@mui/icons-material/PersonAdd";
import DeleteModal from "../../components/DeleteModal";
import { Author } from "../../api/author/authorModel";
import { toast } from "react-toastify";

const Authors = () => {
  const [deleteAuthor] = useDeleteAuthorMutation();
  const { data, error, isLoading } = useGetAllQuery();
  const [authorToDelete, setAuthorToDelete] = useState<Author | undefined>(
    undefined
  );

  const navigate = useNavigate();
  return (
    <Container>
      <div style={{ display: "flex", marginTop: "1%", marginBottom: "1%" }}>
        <Button
          style={{ marginLeft: "auto" }}
          onClick={() => {
            navigate(appRoutes.author.create);
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
            {data!.map((author) => (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.email}</td>
                <td>{new Date(author.dateOfBirth).toDateString()}</td>
                <td>
                  <Button
                    style={{ marginRight: "3%" }}
                    onClick={() =>
                      navigate(appRoutes.author.update.route(author.id))
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
    </Container>
  );
};
export default Authors;
