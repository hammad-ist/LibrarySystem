import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { appRoutes } from "../routes/Routes";
import { Link } from "react-router-dom";
import { FC } from "react";

const NavigationBar: FC = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={appRoutes.home.index} className="nav-link">
              Home
            </Link>
            <Link to={appRoutes.author.index} className="nav-link">
              Authors
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
