import { Button, Container, Row, Spinner } from "react-bootstrap";
import { useGetAllQuery } from "../../api/book/bookApi";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/AppRoutes";
import Card from "react-bootstrap/Card";
import EditTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import { Book } from "../../api/book/bookModel";
import { useDeleteBookMutation } from "../../api/book/bookApi";
import { FC, useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";
const Books: FC = () => {
  const { data, error, isLoading } = useGetAllQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [bookToDelete, setBookToDelete] = useState<Book | undefined>(undefined);
  const navigate = useNavigate();
  return (
    <Container>
      <div style={{ display: "flex", marginTop: "1%", marginBottom: "1%" }}>
        <Button
          style={{ marginLeft: "auto" }}
          onClick={() => {
            navigate(AppRoutes.book.create);
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
        <Container>
          <Row>
            {data?.map((book) => (
              <Card key={book.id} style={{ width: "18rem", margin: "1%" }}>
                <Container style={{ height: "75%" }}>
                  <Card.Body>
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
                    <DeleteForeverTwoToneIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(AppRoutes.book.update.route(book.id));
                    }}
                  >
                    <EditTwoToneIcon />
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
    </Container>
  );
};
export default Books;
