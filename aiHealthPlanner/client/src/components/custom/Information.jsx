/* eslint-disable react/prop-types */
import { IoIosSend } from "react-icons/io";
import { Button } from "../ui/button";
const Information = ({ planInfo }) => {
  return (
    <>
      {/* Image Section   */}
      <div
        className="w-[95%] h-[50vh] bg-amber-500 rounded-md mt-2 mb-[2rem]"
        style={{
          backgroundImage: `url('/Images/placeHolder.avif')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      {/* Label Information */}
      <div className="w-[95%] flex flex-col justify-center items-start p-2 mb-[2rem]">
        <div className="mb-[2rem] flex justify-around items-center w-[95%] lg:w-[35%]">
          {/* Location Name   */}
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
