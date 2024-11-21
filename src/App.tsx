import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import TaskDashboard from "./pages/dashboard";
import Navigation from "./_components/Navigation";
import SignupPage from "./pages/Signup";
import { NotFoundPage } from "./_components/NotFoundPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true;
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <div className="w-full h-full justify-center flex">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <TaskDashboard />
              // </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}
