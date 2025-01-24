import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const Header = () => {
  //Constants:
  const navigate = useNavigate();
  return (
    <div className="mt-2 mb-[2rem] w-[95%] h-[30vh] lg:h-[25vh] bg-transparent flex justify-around items-center border-b-2 border-slate-400">
      {/* Logo Section*/}
      <div
        className="bg-transparent h-[40vh] lg:h-[30vh] w-[60%] lg:w-[22%] hover:cursor-pointer"
        style={{
          backgroundImage: `url('/Images/arogyaXlogoTransparent.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        title="Home"
        onClick={() => navigate("/")}
      ></div>
      <Button className="w-[30%] lg:w-[10%] h-[8vh] text-[1.05rem] hover:cursor-pointer transition-transform ease-in-out hover:scale-105">
        Sign In
      </Button>
    </div>
  );
};

export default Header;
