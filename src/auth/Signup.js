
import React, { useState } from "react";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./Auth.css";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.signup(userData).then(
      () => {
        setMessage("User registered successfully.");
        navigate("/login");
      },
      (error) => {
        setMessage("Error in registration.");
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
              

            <select
              className="select"
              name="userRole"
              value={userData.userRole}
              onChange={handleChange}
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Signup;
