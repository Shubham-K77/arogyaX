/* eslint-disable react/prop-types */
const WellnessPlan = ({ wellnessData }) => {
  const itinerary = wellnessData?.wellnessData?.itinerary || [];
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
              {day.activities.map((activity, activityIndex) => (
                <div
                  key={activityIndex}
                  className="w-full md:w-[48%] lg:w-[30%] p-4 bg-transparent border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-transform ease-in-out hover:scale-105"
                >
                  <div className="w-full h-40 bg-gray-800 rounded-md mb-4"></div>
                  <h3 className="text-lg font-medium mb-2">
                    {activity.activityName || "N/A"}
                  </h3>
                  <p className="text-sm mb-2 text-gray-700">
                    🖹 <strong>Description:</strong>{" "}
                    {activity.description || "No description available"}
                  </p>
                  <p className="text-sm mb-2 text-gray-700">
                    📍 <strong>Location:</strong> {activity.placeName || "N/A"}
                  </p>
                  <p className="text-sm mb-2 text-gray-700">
                    💰 <strong>Price:</strong>{" "}
                    {activity.activityPricing
                      ? `${activity.activityPricing} (local currency)`
                      : "Free"}
                  </p>
                  <p className="text-sm text-gray-700">
                    ⏱️ <strong>Best Time:</strong>{" "}
                    {activity.suggestedTimeSchedule || "Any time"}
                  </p>
                </div>
              ))}
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
