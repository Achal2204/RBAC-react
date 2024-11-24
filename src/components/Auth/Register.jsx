import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const hashedPassword = bcrypt.hashSync(formData.password, 10);

      // Add a new user to the existing users list in your JSON Bin
      const API_URL = "https://api.jsonbin.io/v3/b/6742c525ad19ca34f8cf5937";
      const API_KEY =
        "$2a$10$zrfrbsLMkD.A0EC9Ai.3KOhLPqcS1GcTbavVzljNlKWAGsTUS51fe";

      // Fetch the existing users first
      const response = await axios.get(API_URL, {
        headers: {
          "X-Master-Key": API_KEY,
        },
      });

      const existingUsers = response.data.record.users;

      // Add the new user to the existing users array
      const newUser = {
        ...formData,
        password: hashedPassword,
        role: "user",
        isActive: true,
      };
      const updatedUsers = [...existingUsers, newUser];

      // Update the JSON Bin with the new users list
      await axios.put(
        API_URL,
        { users: updatedUsers },
        {
          headers: {
            "X-Master-Key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      // Success message and form reset
      toast.success("Registration successful! Please log in.");
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Registration failed.");
    }
    setLoading(false);
  };

  if (loading) {
    <Spinner />;
  }

  return (
    <div className="m-auto w-full max-w-[30%] border p-4 rounded-xl shadow-xl mt-5 pb-10 bg-slate-200">
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Register New User</Typography>
        <TextField
          label="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          fullWidth
          margin="normal"
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          fullWidth
          required
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          fullWidth
          required
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          fullWidth
          required
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button variant="contained" onClick={handleRegister} sx={{ mt: 2 }}>
          Register
        </Button>
        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
        <div className="mt-5">
          <Link to="/" className="text-blue-700">
            Already have an account? Login
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default Register;
