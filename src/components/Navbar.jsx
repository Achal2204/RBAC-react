import React, { useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rolePermissions, setRolePermissions] = useState([]);
  const API_KEY =
    "$2a$10$zrfrbsLMkD.A0EC9Ai.3KOhLPqcS1GcTbavVzljNlKWAGsTUS51fe";

  useEffect(() => {
    const fetchRolePermissions = async () => {
      if (user?.role) {
        try {
          const response = await axios.get(
            "https://api.jsonbin.io/v3/b/6742c525ad19ca34f8cf5937",
            {
              headers: {
                "X-Master-Key": API_KEY,
              },
            }
          );

          const roleData = response.data.record.roles?.find(
            (role) => role.name === user.role
          );

          setRolePermissions(roleData?.permissions || []);
        } catch (error) {
          console.error("Error fetching role permissions:", error);
        }
      }
    };

    fetchRolePermissions();
  }, [user]);

  const navOptions = {
    admin: [
      { label: "Home", path: "/user/home" },
      { label: "User Management", path: "/admin/user-management" },
      { label: "Role Management", path: "/admin/role-management" },
      { label: "Add Spots", path: "/admin/add-spots", permission: "Write" },
    ],
    user: [
      { label: "Home", path: "/user/home" },
      { label: "Explore", path: "/user/explore", permission: "Read" },
      { label: "Add Spots", path: "/user/add-spots", permission: "Write" },
    ],
  };

  const handleNavClick = (option) => {
    if (option.permission && !rolePermissions.includes(option.permission)) {
      toast.error(`You are not authorized to access ${option.label}.`);
      return;
    }
    if (option.label === "Home" && !user?.isActive) {
      toast.error("You are not authorized to access this page.");
      return;
    }
    navigate(option.path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position=""
      className="bg-slate-900"
      style={{ background: "#1e293b", border: "1px solid white" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          RBAC App
        </Typography>
        {user?.role &&
          navOptions[user.role]?.map((option) => (
            <Button
              key={option.label}
              color="inherit"
              onClick={() => handleNavClick(option)}
            >
              {option.label}
            </Button>
          ))}
        {user?.role && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
