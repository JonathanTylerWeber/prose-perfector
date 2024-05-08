import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ProseApi from '../API/api';

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
    <div>
      <h1>Edit {username}'s Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;
