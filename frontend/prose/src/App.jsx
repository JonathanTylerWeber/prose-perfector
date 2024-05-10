import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./routes-nav/Navbar"
import { jwtDecode } from "jwt-decode";
import Home from "./homepage/Home";
import ProseApi from "./API/api";
import LoginForm from "./auth/Login";
import SignupForm from "./auth/Signup";
import PromptForm from "./prompts/PromptForm"
import History from "./prompts/History"
import UseLocalStorage from "./hooks/UseLocalStorage";
import PrivateRoute from './routes-nav/PrivateRoute';
import ProfileForm from './profiles/ProfileForm'
import "./App.css"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = UseLocalStorage('token', null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log(`****** token${token}`)
      if (token && !currentUser) {
        try {
          let { username } = jwtDecode(token);
          ProseApi.token = token;
          let currentUser = await ProseApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setLoading(false);
          console.log(`use effect user: ${currentUser}`)
        } catch (error) {
          console.error("Failed to fetch user information:", error);
          setLoading(false);
        }
      } else {
        setLoading(false); // Set loading to false if there's no token or currentUser
      }
    };

    fetchUserInfo();
  }, [token, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogin = async (username, password) => {
    try {
      let token = await ProseApi.login(username, password);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error };
    }
  };

  const handleSignup = async (userData) => {
    try {
      const token = await ProseApi.signup(userData);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, error: error };
    }
  };


  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  console.log("currentUser in App:", currentUser);

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComp currentUser={currentUser} handleLogout={handleLogout} />
        <main>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home currentUser={currentUser} />}
            />
            < Route
              exact
              path="/login"
              element={<LoginForm handleLogin={handleLogin} />} />
            <Route
              exact
              path="/signup"
              element={<SignupForm handleSignup={handleSignup} />}
            />
            <Route
              path="/submitForm"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <PromptForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <History currentUser={currentUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:username"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <ProfileForm currentUser={currentUser} />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}

export default App;

