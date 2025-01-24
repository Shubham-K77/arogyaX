/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const Recommend = ({ planInfo }) => {
  const wellnessOptions =
    planInfo?.wellnessData?.personalizedWellnessPlans ??
    planInfo?.wellnessData?.healthAndWellnessPlan?.personalizedWellnessPlans ??
    planInfo?.wellnessData?.wellnessPlan?.personalizedWellnessPlans;

  console.log(wellnessOptions);

  return (
    <div className="w-[95%] bg-transparent rounded-md mb-[2rem] flex flex-col justify-start items-start">
      <div className="text-[1.45rem] font-bold mb-[2rem] ml-2 text-center lg:text-start">
        Wellness Activities Recommendations:
      </div>
      <div>
        <div className="mb-[2rem] w-[98%] bg-transparent flex flex-col justify-start items-center lg:flex-row lg:justify-evenly lg:items-center lg:flex-wrap">
          {wellnessOptions?.map((item, index) => (
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
                    backgroundImage: `url('/Images/template.avif')`,
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
