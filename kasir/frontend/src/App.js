import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cashier from "./pages/Cashier";
import AddUser from "./pages/AddUser";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function App() {
  const [role, setRole] = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const tokenPetugas = localStorage.getItem("tokenPetugas");

    if (!tokenPetugas) {
      const decodedToken = jwtDecode(token);
      const id = decodedToken.userId;

      const response = await axios.get(`http://localhost:5000/account/${id}`);
      setRole(response.data.role);
    } else {
      const decodedToken = jwtDecode(tokenPetugas);
      const id = decodedToken.petugasId;

      const response = await axios.get(`http://localhost:5000/user/${id}`);
      setRole(response.data.role);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cashier />} />
        <Route path="/dashboard" element={role === "petugas" ? <Navigate to="/" /> : <Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add/user" element={role === "petugas" ? <Navigate to="/" /> : <AddUser />} />
        <Route path="/add/product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
