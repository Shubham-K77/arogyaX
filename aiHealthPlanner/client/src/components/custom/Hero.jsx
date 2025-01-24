/* eslint-disable react/no-unescaped-entities */
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  //Constants:
  const navigate = useNavigate();
  return (
    // Banner
    <div className="w-full lg:w-[95%] h-[70vh] flex flex-col justify-start items-center bg-transparent mb-[2rem] ">
      <div className="mt-2 mb-2 w-[85%] lg:w-[50%] p-2 flex justify-center items-center">
        <h1 className="font-bold text-[1.5rem] lg:text-[2.5rem] text-center">
          <span className="mr-2 text-[#FF6F00]"> ArogyaX: </span> Unlock Your
          Path to Personalized Wellness with AI-Powered Health Solutions
        </h1>
      </div>
      <div className="mb-[2rem] text-[1.15rem] lg:text-[1.25rem] w-[95%] p-2 text-center">
        Your personal wellness guide, crafting tailored health plans for your
        needs and budget.
      </div>
      <Button
        className="mb-2 h-[10vh] lg:h-[8vh] w-[50%] lg:w-[14%] text-[1rem] transition-transform ease-in-out hover:scale-105 hover:cursor-pointer"
        onClick={() => navigate("/create-plan")}
      >
        Get Started, It's Free
      </Button>
    </div>
  );
};

export default Hero;
