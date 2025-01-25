import express from "express";
import dotenv from "dotenv";
import axios from "axios";
const googleRouter = express.Router();
dotenv.config();
const apiKey = process.env.GOOGLE_PLACES_API_KEY;

const fetchPlaceId = async (placeName) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: placeName,
          key: apiKey,
        },
      }
    );
    return response.data.results[0]?.place_id;
  } catch (error) {
    console.error("Error in fetchPlaceId:", error.message);
  }
};

googleRouter.get("/maps-api", async (req, res) => {
  const { placeid, placeName } = req.query;
  try {
    if (!placeid && !placeName) {
      return res
        .status(400)
        .send("Missing 'placeid' or 'placeName' query parameter.");
    }
    let finalPlaceId = placeid;
    if (!placeid && placeName) {
      finalPlaceId = await fetchPlaceId(placeName);
      if (!finalPlaceId) {
        return res.status(404).send("Place not found.");
      }
    }
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          placeid: finalPlaceId,
          key: apiKey,
          fields: "photos,name,place_id",
        },
      }
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error response:", error.response.data);
    res.status(500).send("Error fetching data from Google Maps API.");
  }
});

export default googleRouter;
