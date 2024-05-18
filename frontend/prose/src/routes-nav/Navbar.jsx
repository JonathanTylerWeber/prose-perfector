import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap"
import './Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

function NavbarComp({ currentUser, handleLogout }) {


  return (

    <Navbar expand="lg" fixed="top" className="navbar">
      <Container>
        <Navbar.Brand className="nav-link " exact='true' href="/">
          <span className="brand">
            <div className="square-container">
              <FontAwesomeIcon className="logo" icon={faSquarePen} />
            </div>
            <div className="brand-text">
              Prose Perfector
            </div>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggler" />

        {currentUser ? (

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Nav.Link className="nav-link mx-3" exact='true' href="/submitForm">New Prompt</Nav.Link>
              <Nav.Link className="nav-link" href="/history" >History</Nav.Link>
              <Nav.Link className="nav-link mx-3" href={`/profile/${currentUser.username}`} >Profile</Nav.Link>
            </Nav>
            <Nav className=" ms-auto">
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
    </Navbar >

  );
}

export default NavbarComp;