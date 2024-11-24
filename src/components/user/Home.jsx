import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Box, Typography } from "@mui/material";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" className="text-white">
        Welcome, {user.firstName}!
      </Typography>
    </Box>
  );
};

export default Home;
