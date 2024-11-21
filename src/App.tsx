import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import TaskDashboard from "./pages/dashboard";
import Navigation from "./_components/Navigation";

export default function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<TaskDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
