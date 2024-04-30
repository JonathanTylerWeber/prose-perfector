import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap"
import './Navbar.css'

function NavbarComp({ currentUser, handleLogout }) {


  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand className="nav-link fs-3" exact='true' href="/">Prose Perfector</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {currentUser ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-link mx-3" >New Prompt</Nav.Link>
              <Nav.Link className="nav-link" >History</Nav.Link>
              <Nav.Link className="nav-link mx-3" href="#link">Profile</Nav.Link>
            </Nav>
            <Nav className="ms-auto ">
              <Nav.Link exact='true' href="/" onClick={handleLogout}>
                <button className="btn btn-success ">Log out</button>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>

        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <Nav.Link className="nav-link mx-3 my-auto" exact='true' href="/login">Login</Nav.Link>
              <Nav.Link exact='true' href="/signup">
                <button className="btn my-auto">Sign Up</button>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavbarComp;