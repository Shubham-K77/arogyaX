/* eslint-disable react-hooks/exhaustive-deps */
//Imports:
import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/Firebase";
import Header from "@/components/custom/Header";
import axios from "axios";

//Fetching The Plans:
const Plans = () => {
  //Navigating:
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [images, setImages] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  // Fetch User Plans:
  const fetchUserPlans = useCallback(async () => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (!user) {
      navigate("/");
      enqueueSnackbar("User Not Logged In!", { variant: "error" });
      return;
    }
    try {
      const q = query(
        collection(db, "AIPlans"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      const fetchedPlans = [];
      querySnapshot.forEach((doc) => {
        fetchedPlans.push(doc.data());
      });
      setPlans(fetchedPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      enqueueSnackbar("Failed to fetch plans!", { variant: "error" });
    }
  }, [navigate, enqueueSnackbar]);
  // Fetch Image Data:
  const fetchImageData = async (name) => {
    if (images[name]) return;
    try {
      const response = await axios.get(
        "http://localhost:5555/googleApi/maps-api",
        {
          params: { placeName: name },
        }
      );
      const photoData = response?.data?.result?.photos?.[0];
      setImages((prev) => ({
        ...prev,
        [name]: photoData,
      }));
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };
  // Fetch Plans:
  useEffect(() => {
    fetchUserPlans();
  }, [fetchUserPlans]);

  // Fetch Images when Plans Change:
  useEffect(() => {
    if (plans.length > 0) {
      plans.forEach((plan) =>
        fetchImageData(plan?.userSelection?.location?.label)
      );
    }
  }, [plans]);

  // Rendering:
  return (
    <div className="w-full flex flex-col justify-start items-center">
      {/* Rendering The Header: */}
      <Header />
      {/* Display The Trips Details: */}
      <div className="w-[95%] bg-transparent rounded-md mb-2 flex flex-col justify-start items-start p-2">
        <div className="mb-2 mt-2 text-[1.45rem] font-bold ml-2">My Plans:</div>
        <div className="mb-2 mt-2 bg-transparent w-[98%] flex flex-col justify-start items-center lg:flex-row lg:justify-around lg:items-center lg:flex-wrap">
          {/* Mapping the plans: */}
          {plans.map((plan, index) => {
            const location = plan?.userSelection?.location?.label;
            const photoData = images[location];
            const imageUrl = photoData
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                  photoData.photo_reference
                }&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`
              : "/Images/arogyaXlogoTransparent.png";

            return (
              <div
                key={index}
                className="bg-transparent h-[75vh] w-[95%] mt-2 mb-2 lg:mt-[2rem] lg:w-[25%] lg:ml-2 lg:mb-[2rem] rounded-md flex flex-col justify-start items-center border-2 border-gray-300 transition-transform ease-in-out hover:cursor-pointer hover:scale-105 hover:border-blue-500"
                onClick={() => navigate(`/view-plan/${plan.id}`)}
              >
                {/* Image */}
                <div
                  className="bg-transparent h-[40vh] w-[95%] mt-2 mb-2"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                {/* Details */}
                <div className="mt-2 mb-2 text-[1.05rem] text-center font-semibold">
                  😷 {plan?.userSelection?.healthConcern?.label}
                </div>
                <div className="mt-2 mb-2 text-[1.05rem] text-center font-semibold">
                  📍 {plan?.userSelection?.location?.label}
                </div>
                <div className="mt-2 mb-2 text-[1.05rem] text-center">
                  📅 {plan?.userSelection?.noOfDays} days
                </div>
                <div className="mt-2 mb-2 text-[1.05rem] text-center">
                  👣 {plan?.userSelection?.noOfPeople} people
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Plans;
