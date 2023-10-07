import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import ProfileDetails from "./components/ProfileDetails";

function App() {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/profileDetails/:id"
          element={user ? <ProfileDetails /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
