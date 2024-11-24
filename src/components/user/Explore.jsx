import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import Spinner from "../Spinner";

const Explore = () => {
  const [spots, setSpots] = useState([]);
  const API_KEY =
    "$2a$10$zrfrbsLMkD.A0EC9Ai.3KOhLPqcS1GcTbavVzljNlKWAGsTUS51fe";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSpots();
  }, []);
  const fetchSpots = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.jsonbin.io/v3/b/6742c525ad19ca34f8cf5937",
        {
          headers: {
            "X-Master-Key": API_KEY,
          },
        }
      );
      setSpots(response.data.record.spots);
    } catch (error) {
      console.error("Error fetching spots:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-28">
      <div className="mt-5 flex justify-center">
        {" "}
        <h3 className="text-3xl font-bold text-white">Explore New World</h3>
      </div>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {spots.map((spot) => (
          <Grid item xs={12} sm={6} md={4} key={spot.id}>
            <Card className="h-full">
              <CardMedia
                component="img"
                height="140"
                image={spot.imageUrl}
                alt={spot.locationName}
              />
              <CardContent>
                <Typography variant="h5">{spot.locationName}</Typography>
                <Typography>{spot.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Explore;
