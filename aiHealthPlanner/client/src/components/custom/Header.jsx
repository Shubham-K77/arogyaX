import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Header = () => {
  //Constants:
  const navigate = useNavigate();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  return (
    <div className="mt-2 mb-[2rem] w-[95%] h-[30vh] lg:h-[25vh] bg-transparent flex justify-around items-center border-b-2 border-slate-400">
      {/* Logo Section*/}
      <div
        className="bg-transparent h-[40vh] lg:h-[30vh] w-[50%] lg:w-[22%] hover:cursor-pointer"
        style={{
          backgroundImage: `url('/Images/arogyaXlogoTransparent.png')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        title="Home"
        onClick={() => navigate("/")}
      ></div>
      {user ? (
        <div className="w-[45%] lg:w-[20%] h-[22vh] lg:h-[18vh] bg-transparent flex flex-col justify-start items-center lg:flex-row lg:justify-center lg:items-center">
          <Button className="rounded-md w-[85%] mt-2 mb-2 lg:m-0 lg:w-[50%] h-[10vh] lg:h-[8vh] transition-transform ease-in-out hover:scale-105">
            {" "}
            My Trips
          </Button>
          <div
            className="w-[38%] lg:w-[23%] h-[9vh] rounded-[50%] ml-4 shadow-md"
            style={{
              backgroundImage: `url(${user.picture})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      ) : (
        <Button className="w-[30%] lg:w-[10%] h-[8vh] text-[1.05rem] hover:cursor-pointer transition-transform ease-in-out hover:scale-105">
          Sign In
        </Button>
      )}
    </div>
  );
};

export default Header;
