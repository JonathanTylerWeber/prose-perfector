import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Form, Button, Nav } from "react-bootstrap"
import "./Signup.css"

function SignupForm({ handleSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password, email };
    const result = await handleSignup(userData);
    if (result && result.success) {
      setLoggedIn(true);
    } else {
      console.error("Signup failed:", result ? result.error : "Unknown error");
      setError(result ? result.error : "Unknown error");
      return { success: false };
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="m-auto cntr">
      <Form onSubmit={handleSubmit}>
        <h1 className="signup-h1">Sign Up</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username}
            onChange={(e) => setUsername(e.target.value)}
            required placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required placeholder="Enter password" />
        </Form.Group>

        <Button className="btn auth-btn" variant="primary" type="submit">
          Submit
        </Button>

        <Nav.Link className="nav-link my-3" exact='true' href="/login">Already have an account?</Nav.Link>

      </Form>
    </Container>
  );
}

export default SignupForm;



