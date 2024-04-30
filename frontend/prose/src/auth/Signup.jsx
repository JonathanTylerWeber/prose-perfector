import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import "./Signup.css"

function SignupForm({ handleSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, password, email };
    handleSignup(userData);
  };

  return (
    <Container className="m-auto cntr">
      <Form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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

        <Button className="btn" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default SignupForm;



