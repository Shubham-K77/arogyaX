/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const Clinic = ({ planInfo }) => {
  const healthcareOptions =
    planInfo?.wellnessData?.healthcareOptions ??
    planInfo?.wellnessData?.wellnessPlan?.healthcareOptions;
  return (
    <div className="w-[95%] bg-transparent mb-[2rem] flex flex-col justify-start items-start p-2">
      <div className="mb-[2rem] text-[1.35rem] font-bold text-center">
        Wellness Destination Recommendations:
      </div>
      <div className="mb-[2rem] w-[98%] bg-transparent flex flex-col justify-start items-center lg:flex-row lg:justify-evenly lg:items-center lg:flex-wrap">
        {healthcareOptions?.map((item, index) => (
          <div
            key={index}
            className="w-[95%] h-[75vh] mt-2 mb-2 lg:mb-[1.25rem] lg:mr-2 lg:w-[25%] lg:h-[80vh] bg-transparent flex flex-col justify-start items-center border-2 border-gray-200 hover:cursor-pointer rounded-md shadow-sm transition-transform ease-in-out hover:scale-105 hover:bg-gray-300"
          >
            <Link
              to={`https://www.google.com/maps/search/?api=1&query=${item?.name} ${item?.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[98%] no-underline flex flex-col justify-start items-center lg:flex-row lg:justify-evenly lg:items-center lg:flex-wrap"
            >
              <div
                className="w-[95%] h-[25vh] lg:w-[90%] lg:h-[32vh] mt-[1rem] mb-2 shadow-md"
                style={{
                  backgroundImage: `url('/Images/template.avif')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="text-[1.10rem] mb-1 font-bold">{item?.name}</div>
              <div className="text-[1rem] mb-1">📍 {item?.address}</div>
              <div className="text-[1rem] mr-2 mb-1">
                💬 Consultation: {item?.priceRange?.consultation}{" "}
              </div>
              <div className="text-[1rem] mr-2 mb-2 text-center">
                ⚕️ Services: {planInfo?.wellnessData?.currency}{" "}
                {item?.priceRange?.services}{" "}
              </div>
              <div className="text-[1rem] mr-2 mb-1">
                ⭐ Rating: {item?.rating}
              </div>
              <div className="mt-[2rem] mb-1 text-[1rem] p-2 text-center">
                {item?.description}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clinic;
