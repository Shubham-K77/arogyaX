/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const WellnessPlan = ({ wellnessData }) => {
  const itinerary = wellnessData?.wellnessData?.itinerary || [];
  const [image, setImage] = useState({});
  const fetchImageData = async (name) => {
    try {
      const response = await axios.get(
        "http://localhost:5555/googleApi/maps-api",
        {
          params: { placeName: name },
        }
      );
      if (
        response?.data?.result?.photos &&
        response?.data?.result?.photos.length > 0
      ) {
        return {
          name,
          photo: response?.data?.result?.photos[0],
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching image data:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchAllImages = async () => {
      if (itinerary?.length) {
        const imagePromises = [];
        itinerary.forEach((day) => {
          day.activities?.forEach((activity) => {
            imagePromises.push(fetchImageData(activity?.placeName));
          });
        });
        const imageResults = await Promise.all(imagePromises);
        const imageMap = imageResults.reduce((acc, result) => {
          if (result) {
            acc[result.name] = result.photo;
          }
          return acc;
        }, {});
        setImage(imageMap);
      }
    };
    fetchAllImages();
  }, [itinerary]);

  return (
    <div className="w-[95%] p-4 bg-transparent">
      <h1 className="text-2xl font-bold mb-6">Health and Wellness Plan:</h1>
      {itinerary.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className="p-4 bg-transparent rounded-lg mb-6 border-2 border-gray-300"
        >
          <h2 className="text-xl font-semibold mb-4">Day {day.day}</h2>
          {day.activities && day.activities.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {day.activities.map((activity, activityIndex) => {
                const imageUrl = image[activity?.placeName]
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                      image[activity?.placeName]?.photo_reference
                    }&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`
                  : "/Images/arogyaXlogoTransparent.png";
                return (
                  <div
                    key={activityIndex}
                    className="w-full md:w-[48%] lg:w-[30%] p-4 bg-transparent border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-transform ease-in-out hover:scale-105 hover:cursor-pointer"
                  >
                    <Link
                      to={`https://www.google.com/maps/search/?api=1&query=${activity?.placeName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[98%] no-underline flex flex-col justify-start items-center"
                    >
                      <div
                        className="w-full h-40 rounded-md mb-4"
                        style={{
                          backgroundImage: `url(${imageUrl})`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      ></div>
                      <h3 className="text-lg font-medium mb-4">
                        {activity.activityName || "N/A"}
                      </h3>
                      <p className="text-sm mb-4 text-gray-700">
                        🖹 <strong>Description:</strong>{" "}
                        {activity.description || "No description available"}
                      </p>
                      <p className="text-sm mb-4 text-gray-700">
                        📍 <strong>Location:</strong>{" "}
                        {activity.placeName || "N/A"}
                      </p>
                      <p className="text-sm mb-4 text-gray-700">
                        💰 <strong>Price:</strong>{" "}
                        {activity.activityPricing
                          ? `${activity.activityPricing} (local currency)`
                          : "Free"}
                      </p>
                      <p className="text-sm text-gray-700">
                        ⏱️ <strong>Best Time:</strong>{" "}
                        {activity.suggestedTimeSchedule || "Any time"}
                      </p>
                      <Button className="mt-2 w-[50%] h-[8vh] lg:w-[35%] lg:h-[7vh]">
                        🧭 Navigate
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">
              No activities available for this day.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default WellnessPlan;
