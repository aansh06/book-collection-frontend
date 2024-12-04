import React, { useState } from "react";
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navbar";
import { Nav } from "react-bootstrap";
import "./Auth.css";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(userData).then(
      (response) => {
        localStorage.setItem("user", JSON.stringify(response));
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1000,
        });

        if (response.userRole == "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      },
      (error) => {
        setMessage("Invalid username or password.");
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              className="input"
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="button">
            Login
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Login;
