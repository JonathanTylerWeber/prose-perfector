import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ProseApi from '../API/api';
import "./ProfileForm.css"
import { Container, Form, Button } from "react-bootstrap"

function ProfileForm() {
  const [user, setUser] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await ProseApi.getCurrentUser(username);
        setUser(userData);
        setFormData({
          email: userData.email,
          password: ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const data = { email };
      if (password.trim() !== "") {
        data.password = password;
      }
      await ProseApi.updateUser(username, data);
      setUpdated(true);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (updated) {
    return <Navigate to="/" />;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  console.log

  return (
    <Container className="cntr">
      <h1 className="profile-h1">Edit {username}'s Profile</h1>
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className='label'>Update Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className='label'>New Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="btn auth-btn" variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}

export default ProfileForm;
