import { useEffect, FC } from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useAddBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../api/book/bookApi";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../../routes/AppRoutes";
import { Book } from "../../api/book/bookModel";
import { useGetAllQuery } from "../../api/author/authorApi";
const CreateBook: FC = () => {
  const getAuthorsQuery = useGetAllQuery();
  const { id } = useParams();
  const { data } = useGetBookQuery(id!, { skip: !id });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Book>({
    defaultValues: {
      name: "",
      isbn: "",
      authorId: undefined,
    },
  });
  const [addBook] = useAddBookMutation();

  const [updateBook] = useUpdateBookMutation();

  useEffect(() => {
    if (id && data) {
      setValue("name", data.name);
      setValue("isbn", data.isbn);
      setValue("authorId", data.authorId);
      setValue("authorName", data.authorName);
    }
  }, [id, data]);

  const onSubmit: SubmitHandler<Book> = async (data) => {
    if (id) {
      const updateResponse = await updateBook({ ...data, id: parseInt(id) });
      if ("data" in updateResponse) {
        toast.success("Book updated successfully");
        navigate(AppRoutes.book.index);
      } else {
        toast.error("Something went wrong");
        navigate(AppRoutes.book.index);
      }
    } else {
      const response = await addBook(data);
      if ("data" in response) {
        toast.success("Book Created Successfully");
        navigate(AppRoutes.book.index);
      } else {
        toast.error("Something went wrong");
        navigate(AppRoutes.book.index);
      }
    }
  };
  return (
    <Container style={{ marginTop: "5%" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Book Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              {...register("name", {
                required: "Please enter Book name",
                minLength: 3,
              })}
              type="text"
              placeholder="Enter Book Name"
            />
            {errors.name && (
              <div style={{ color: "red" }}>{errors.name.message}</div>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Book Isbn
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              {...register("isbn", {
                required: "Please enter Book Isbn",
              })}
              type="text"
              placeholder="Enter Isbn"
            />
            {errors.isbn && (
              <div style={{ color: "red" }}>{errors.isbn.message}</div>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Select Author
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              {...register("authorId", {
                required: "Please select an author",
              })}
            >
              <option value={""}>--Select--</option>
              {getAuthorsQuery?.data?.map((x, i) => (
                <option value={x.id} key={i}>
                  {x.name}
                </option>
              ))}
            </Form.Select>
            {errors.authorId && (
              <div style={{ color: "red" }}>{errors.authorId.message}</div>
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button disabled={isSubmitting} variant="primary" type="submit">
              {isSubmitting ? "Loading..." : "Submit"}
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default CreateBook;
