import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./routes-nav/Navbar"
import { jwtDecode } from "jwt-decode";
import Home from "./homepage/Home";
import ProseApi from "./api/api";
import LoginForm from "./auth/Login";
import SignupForm from "./auth/Signup";
import PromptForm from "./prompts/PromptForm"
import UseLocalStorage from "./hooks/UseLocalStorage";
import PrivateRoute from './routes-nav/PrivateRoute';
// import Profile from './Profile'
import "./App.css"

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = UseLocalStorage('token', null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          ProseApi.token = token;
          let currentUser = await ProseApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          console.log(`use effect user: ${currentUser}`)
        } catch (error) {
          console.error("Failed to fetch user information:", error);
        }
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleLogin = async (username, password) => {
    try {
      let token = await ProseApi.login(username, password);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Login failed:", errors);
      return { success: false, errors };
    }
  };

  const handleSignup = async (userData) => {
    try {
      const token = await ProseApi.signup(userData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup failed:", errors);
      return { success: false, errors };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
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
            <Route
              path="/submitForm"
              element={
                // <PrivateRoute currentUser={currentUser}>
                <PromptForm />
                // </PrivateRoute>
              }
            />
            {/* <Route
              path="/companies/:handle"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <CompanyDetails currentUser={currentUser}
                    setCurrentUser={setCurrentUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <JobList currentUser={currentUser}
                    setCurrentUser={setCurrentUser} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:username"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <Profile />
                </PrivateRoute>
              }
            /> */}
            < Route
              exact
              path="/login"
              element={<LoginForm handleLogin={handleLogin} />} />
            <Route
              exact
              path="/signup"
              element={<SignupForm handleSignup={handleSignup} />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}

export default App;

