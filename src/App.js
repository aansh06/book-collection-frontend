import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/Routes"; 
import "./App.css"; 

function App() {
  return (
    <div className="App">
      <Router>
        
        <AppRoutes />
      </Router>

     
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
