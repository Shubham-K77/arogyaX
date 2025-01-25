import Header from "@/components/custom/Header";
import Hero from "@/components/custom/Hero";
const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      <Header />
      <Hero />
      <div className="mt-2 mb-2 w-[98%] bg-transparent flex flex-col justify-start items-center lg:flex-row lg:justify-around lg:items-center">
        <div className="w-[95%] lg:w-[30%] flex flex-col justify-center items-center mb-[2rem] lg:mb-0 mt-[2rem] lg:ml-[2rem]">
          <div className="text-[2.25rem] font-bold mb-2 text-[#FF6F00]">
            <span className="text-black"> Your Wellness, </span> Your Way
          </div>
          <div className="text-[1.20rem] mt-2 text-justify">
            ArogyaX is a wellness app that offers tailored recommendations and
            plans for 50 common diseases. Based on your budget, group size,
            duration, and location preferences, it provides personalized
            solutions to help you stay healthy and manage your well-being
            effectively.
          </div>
        </div>
        <div
          className="w-[98%] h-[32vh] mb-2 lg:h-[80vh] lg:w-[65%] lg:m-0"
          style={{
            backgroundImage: `url(/Images/banner.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Home;
