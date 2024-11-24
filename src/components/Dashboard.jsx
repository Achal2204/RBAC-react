import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex justify-center">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }} className="text-white">
          Welcome, {user?.firstName}!
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }} className="text-white">
          {user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </Typography>
      </Box>
    </div>
  );
};

export default Dashboard;
