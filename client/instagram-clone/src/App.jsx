import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

import { useSelector } from "react-redux";
import ProfileDetails from "./components/ProfileDetails";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/profileDetails/:id" element={<ProfileDetails />} />
      </Routes>
    </>
  );
}

export default App;
