import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AppRoutes } from "../routes/AppRoutes";
import { Link } from "react-router-dom";
import { FC } from "react";
import { FaUser } from "react-icons/fa";

const NavigationBar: FC = () => {
  const logOut = () => {
    sessionStorage.setItem("authToken", "");
    sessionStorage.setItem("userName", "");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Link to={AppRoutes.home.index} className="nav-link">
              Home
            </Link>
            <Link to={AppRoutes.author.index} className="nav-link">
              Authors
            </Link>
            <Link to={AppRoutes.book.index} className="nav-link">
              Books
            </Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <FaUser size={15} />
              {sessionStorage.getItem("userName")?.toUpperCase()}
            </Nav.Link>
            <Link
              to={AppRoutes.authentication.login}
              className="nav-link"
              onClick={logOut}
            >
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
