import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

const AddSpots = () => {
  const [spot, setSpot] = useState({
    imageUrl: "",
    locationName: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAddSpot = async () => {
    setLoading(true);
    try {
      const API_URL = "https://api.jsonbin.io/v3/b/6742c525ad19ca34f8cf5937";
      const API_KEY =
        "$2a$10$zrfrbsLMkD.A0EC9Ai.3KOhLPqcS1GcTbavVzljNlKWAGsTUS51fe";

      // Fetch the existing spots first
      const response = await axios.get(API_URL, {
        headers: {
          "X-Master-Key": API_KEY,
        },
      });

      const existingSpots = response.data.record.spots || [];

      const updatedSpots = [...existingSpots, spot];

      await axios.put(
        API_URL,
        { spots: updatedSpots },
        {
          headers: {
            "X-Master-Key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Spot added successfully!");
      setSpot({ imageUrl: "", locationName: "", description: "" });
    } catch (error) {
      console.error("Error adding spot:", error);
      toast.error("Failed to add the spot. Please try again.");
    }
    setLoading(false);
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="m-auto w-full max-w-[30%] border p-4 rounded-xl shadow-xl bg-slate-200 mt-5 pb-10">
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Add Spot</Typography>
        <TextField
          label="Image URL"
          value={spot.imageUrl}
          onChange={(e) => setSpot({ ...spot, imageUrl: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location Name"
          value={spot.locationName}
          onChange={(e) => setSpot({ ...spot, locationName: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={spot.description}
          onChange={(e) => setSpot({ ...spot, description: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <div className="mt-5">
          <Button variant="contained" onClick={handleAddSpot}>
            Add Spot
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddSpots;
