import { FC } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../api/user/userModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppRoutes } from "../../routes/AppRoutes";
import { useGetAuthLoginMutation } from "../../api/user/userApi";
const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();
  const [authLogin] = useGetAuthLoginMutation();
  const onSubmit: SubmitHandler<User> = async (data) => {
    const response = await authLogin(data);
    if ("data" in response) {
      sessionStorage.setItem("authToken", response.data.token);
      sessionStorage.setItem("userName", response.data.username);
      console.log(sessionStorage.getItem("authToken"));
      toast.success("Loged in Successfully");
      navigate(AppRoutes.author.index);
    } else {
      toast.error("Something went wrong");
      navigate(AppRoutes.home.index);
    }
  };
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <p className=" mb-5">Please enter your login and password!</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                      User Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        {...register("userName", {
                          required: "Please enter user name",
                          minLength: 3,
                        })}
                        type="text"
                        placeholder="Enter User Name"
                      />
                      {errors.userName && (
                        <div style={{ color: "red" }}>
                          {errors.userName.message}
                        </div>
                      )}
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm={2}>
                      Password
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        {...register("password", {
                          required: "Password is required",
                          pattern: regex,
                        })}
                        type="password"
                        placeholder="Enter Password"
                      />
                      {errors.password && (
                        <div style={{ color: "red" }}>
                          {errors.password.message}
                        </div>
                      )}
                    </Col>
                  </Form.Group>
                  <div className="mb-3">
                    <p className="small">
                      <a className="text-primary" href="#!">
                        Forgot password?
                      </a>
                    </p>
                  </div>
                  <div className="d-grid">
                    <Button
                      disabled={isSubmitting}
                      variant="primary"
                      type="submit"
                    >
                      {isSubmitting ? "Loading..." : "Log In"}
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Don't have an account?{" "}
                    <Button
                      size="sm"
                      style={{ fontWeight: "bold" }}
                      variant="link"
                      onClick={() => navigate(AppRoutes.authentication.signup)}
                    >
                      Sign Up
                    </Button>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
          <div className="border border-3 border-primary"></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
