import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useAddAuthorMutation,
  useGetAuthorQuery,
} from "../../api/author/authorApi";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import { appRoutes } from "../../routes/Routes";
import { Author } from "../../api/author/authorModel";

type FormFileds = {
  name: string;
  email: string;
  dateOfBirth: Date;
};
const CreateAuthor = () => {
  const [author, setAuthor] = useState<Author>(Object);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFileds>();
  const [addAuthor] = useAddAuthorMutation();
  const { data } = useGetAuthorQuery(id!);
  useEffect(() => {
    if (id && data) {
      setEditMode(true);
      setAuthor({ ...data });
    } else {
      setEditMode(false);
    }
  }, [id, data]);
  const onSubmit: SubmitHandler<FormFileds> = async (data) => {
    const response = await addAuthor(data);
    if ("data" in response) {
      toast.success("Author Created Successfully");
      navigate(appRoutes.author.index);
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <Container style={{ marginTop: "5%" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              {...register("name", {
                required: "Please enter author name",
                minLength: 3,
              })}
              type="text"
              placeholder="Enter Name"
            />
            {errors.name && (
              <div style={{ color: "red" }}>{errors.name.message}</div>
            )}
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              {...register("email", {
                required: "Please enter a valid email",
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              })}
              type="email"
              placeholder="Enter Email"
            />
            {errors.email && (
              <div style={{ color: "red" }}>{errors.email.message}</div>
            )}
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Date
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              {...register("dateOfBirth", {
                valueAsDate: true,
                required: "please enter date of birth",
              })}
              type="date"
            />
            {errors.dateOfBirth && (
              <div style={{ color: "red" }}>{errors.dateOfBirth.message}</div>
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
export default CreateAuthor;
