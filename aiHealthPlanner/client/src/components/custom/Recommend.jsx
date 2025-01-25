/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Recommend = ({ planInfo }) => {
  const wellnessOptions = planInfo?.wellnessData?.personalizedWellnessPlans;
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
        setImage((prev) => ({
          ...prev,
          [name]: response?.data?.result?.photos[0],
        }));
      }
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (wellnessOptions?.length) {
        const fetchPromises = wellnessOptions.map((item) => {
          return fetchImageData(item?.placeName);
        });
        await Promise.all(fetchPromises);
      }
    };

    fetchImages();
  }, [wellnessOptions]);

  return (
    <div className="w-[95%] bg-transparent rounded-md mb-[2rem] flex flex-col justify-start items-start">
      <div className="text-[1.45rem] font-bold mb-[2rem] ml-2 text-center lg:text-start">
        Wellness Activities Recommendations:
      </div>
      <div>
        <div className="mb-[2rem] w-[98%] bg-transparent flex flex-col justify-start items-center lg:flex-row lg:justify-evenly lg:items-center lg:flex-wrap">
          {wellnessOptions?.map((item, index) => {
            const imageUrl = image[item?.name]
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                  image[item?.name]?.photo_reference
                }&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`
              : "/Images/arogyaXlogoTransparent.png";
            return (
              <div
                key={index}
                className="w-[95%] h-[85vh] mt-2 mb-2 lg:mb-[1.25rem] lg:mr-2 lg:w-[25%] lg:h-[85vh] bg-transparent flex flex-col justify-start items-center border-2 border-gray-200 hover:cursor-pointer rounded-md shadow-sm transition-transform ease-in-out hover:scale-105 hover:bg-gray-300"
              >
                <Link
                  to={`https://www.google.com/maps/search/?api=1&query=${item?.placeName} ${planInfo?.userSelection?.location?.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[98%] no-underline flex flex-col justify-start items-center"
                >
                  <div
                    className="w-[95%] h-[25vh] lg:w-[90%] lg:h-[32vh] mt-[1rem] mb-2 shadow-md"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="text-[1.10rem] mb-1 font-bold">
                    {item?.activityName}
                  </div>
                  <div
                    className="text-[1.10rem] mb-1 font-bold"
                    title={item?.placeDetails}
                  >
                    📍 {item?.placeName}
                  </div>
                  <div className="text-[1.10rem] mb-1 font-bold">
                    💵 {item?.activityPricing}
                  </div>
                  <div className="text-[1.10rem] mb-1 font-bold">
                    ⏱️ {item?.suggestedTimeSchedule}
                  </div>
                  <div className="text-[1rem] mr-2 mb-1">
                    ⭐ Rating: {item?.rating}
                  </div>
                  <div className="mt-[2rem] mb-1 text-[1rem] p-2 text-center">
                    {item?.description}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
