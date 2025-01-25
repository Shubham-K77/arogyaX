/* eslint-disable no-unused-vars */
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useSnackbar } from "notistack";

const Header = () => {
  //Constants:
  const navigate = useNavigate();
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const { enqueueSnackbar } = useSnackbar();
  //Login oAuth:
  const logIn = useGoogleLogin({
    onSuccess: (codeResponse) => getUserProfile(codeResponse),
    onError: (error) => console.error(error),
  });

  //Get User Profile:
  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      Cookies.set("user", JSON.stringify(response.data), {
        expires: 1,
        path: "/",
        sameSite: "strict",
      });
      window.location.reload();
    } catch (error) {
      const errorMessage = "Unable To Login";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };
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
          <Button
            className="rounded-md w-[85%] mt-2 mb-2 lg:m-0 lg:w-[50%] h-[10vh] lg:h-[8vh] transition-transform ease-in-out hover:scale-105 text-[1.10rem]"
            onClick={() => navigate("/my-wellness")}
          >
            {" "}
            My Trips
          </Button>
          <Popover>
            <PopoverTrigger className="w-[52%] lg:w-[45%]">
              <div
                className="lg:w-[50%] h-[10vh] lg:h-[9vh] rounded-[50%] ml-4 shadow-md"
                style={{
                  backgroundImage: `url(${user.picture})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                title={user.name}
              ></div>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col justify-start items-center">
              <div className="mt-2 mb-2 text-[1.15rem] font-bold">
                {" "}
                Leaving Us? 🙏{" "}
              </div>
              <Button
                className="mt-2 mb-2 w-[50%] text-[1rem] h-[8vh] transition-transform ease-in-out hover:scale-105"
                onClick={() => {
                  googleLogout();
                  Cookies.set("user", "", {
                    expires: 0,
                    path: "/",
                    sameSite: "strict",
                  });
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button
          className="w-[30%] lg:w-[10%] h-[8vh] text-[1.05rem] hover:cursor-pointer transition-transform ease-in-out hover:scale-105"
          onClick={() => logIn()}
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default Header;
