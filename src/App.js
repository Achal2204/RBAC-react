import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NavBar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/Admin/UserManagement";
import RoleManagement from "./components/Admin/RoleManagement";
import AddSpots from "./components/Admin/AddSpots";
import Explore from "./components/user/Explore";
import Home from "./components/user/Home";

const App = () => {
  return (
    <div className="h-screen bg-slate-800">
      {" "}
      <AuthProvider>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin/user-management"
            element={
              <ProtectedRoute role="admin">
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/role-management"
            element={
              <ProtectedRoute role="admin">
                <RoleManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-spots"
            element={
              <ProtectedRoute role="admin">
                <AddSpots />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/add-spots"
            element={
              <ProtectedRoute role="user">
                <AddSpots />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user/home"
            element={
              <ProtectedRoute role="user">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/explore"
            element={
              <ProtectedRoute role="user">
                <Explore />
              </ProtectedRoute>
            }
          />

          {/* Dashboard for both roles */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

/**
 * ProtectedRoute Component: Restricts route access based on authentication and role.
 * @param {string} role - The role required to access the route (optional).
 */
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default App;
