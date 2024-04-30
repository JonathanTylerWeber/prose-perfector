import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import "./Login.css"

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(username, password);
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="m-auto cntr">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username}
            onChange={(e) => setUsername(e.target.value)}
            required placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required placeholder="Enter password" />
        </Form.Group>

        <Button className="btn" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;





