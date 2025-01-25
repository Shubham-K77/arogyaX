/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { IoIosSend } from "react-icons/io";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
const Information = ({ planInfo }) => {
  const [imageInfo, setImageInfo] = useState(null);
  useEffect(() => {
    if (planInfo) {
      getPlacePhoto();
    }
  }, [planInfo]);
  const getPlacePhoto = async () => {
    try {
      const placeId = planInfo?.userSelection?.location?.value?.place_id;
      if (!placeId) {
        console.error("placeId is not defined in planInfo");
        return;
      }
      const response = await axios.get(
        "http://localhost:5555/googleApi/maps-api",
        {
          params: { placeid: placeId },
        }
      );
      const photos = response?.data?.result?.photos;
      setImageInfo(photos[0]);
    } catch (error) {
      console.error("Error fetching place photo:", error.message);
    }
  };

  return (
    <>
      {/* Image Section */}
      {imageInfo && (
        <div
          className="w-[95%] h-[65vh] rounded-md mt-2 mb-[2rem]"
          style={{
            backgroundImage: `url(https://maps.googleapis.com/maps/api/place/photo?maxwidth=${
              imageInfo.width
            }&photo_reference=${imageInfo.photo_reference}&key=${
              import.meta.env.VITE_GOOGLE_PLACES_API_KEY
            })`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      )}
      {/* Label Information */}
      <div className="w-[95%] flex flex-col justify-center items-start p-2 mb-[2rem]">
        <div className="mb-[2rem] flex justify-around items-center w-[95%] lg:w-[35%]">
          {/* Location Name */}
          <div className="text-[1.45rem] font-bold mr-2">
            {planInfo?.userSelection?.location?.label}
          </div>
          {/* Share Option */}
          <Button className="mb-2 text-[1.15rem] font-bold transition-transform ease-in-out duration-200 hover:cursor-pointer hover:scale-105 h-[8vh] w-[40%] lg:w-[30%]">
            <IoIosSend className="mr-2 text-[1.15rem]" /> Share
          </Button>
        </div>
        <div className="mb-[2rem] text-[1.10rem] w-[95%] h-[15vh] lg:h-[10vh] flex flex-row justify-start items-center flex-wrap">
          <span className="mr-2 p-2 mb-2 lg:mb-0 bg-gray-300 rounded-lg shadow-sm">
            😷 {planInfo?.userSelection?.healthConcern?.label}
          </span>
          <span className="mr-2 p-2 mb-2 lg:mb-0 bg-gray-300 rounded-lg shadow-sm">
            💵 {planInfo?.userSelection?.budget}{" "}
          </span>
          <span className="mr-2 p-2 mb-2 lg:mb-0 bg-gray-300 rounded-lg shadow-sm">
            👣 {planInfo?.userSelection?.noOfPeople}{" "}
          </span>
          <span className="mr-2 p-2 mb-2 lg:mb-0 bg-gray-300 rounded-lg shadow-sm">
            📅 {planInfo?.userSelection?.noOfDays} day{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default Information;
