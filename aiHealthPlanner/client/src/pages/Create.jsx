/* eslint-disable no-unused-vars */
//Imports:
import Header from "@/components/custom/Header";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import {
  generativeAIPrompt,
  healthConcernsOptions,
  selectBudgetList,
  selectPeopleList,
} from "@/options/Lists";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { useSnackbar } from "notistack";
import { chatSession } from "@/services/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/Firebase";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const { enqueueSnackbar } = useSnackbar();
  //Form Data:
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //Handle Form Change:
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  //Display The Change In FormField:
  useEffect(() => {}, [formData]);

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
      setOpenDialog(false);
      handleGeneratePlan();
    } catch (error) {
      const errorMessage = "Unable To Login";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };
  //Generate The Trip:
  const handleGeneratePlan = async () => {
    //Set Loading = True:
    setLoading(true);
    //Check User Is Logged In Or Not:
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (!user) {
      setOpenDialog(true);
      return enqueueSnackbar(
        "Kindly sign in to proceed with the application.",
        {
          variant: "error",
        }
      );
    }
    //Invalid Days!:
    if (!formData?.noOfDays || formData.noOfDays > 14) {
      setLoading(false);
      return enqueueSnackbar(
        "Please ensure the number of days is between 1 and 14.",
        {
          variant: "error",
        }
      );
    }
    //Invalid Location:
    if (!formData.location) {
      setLoading(false);
      return enqueueSnackbar("Please select a location.", {
        variant: "error",
      });
    }
    //Invalid HealthConcern:
    if (!formData.healthConcern) {
      setLoading(false);
      return enqueueSnackbar("Please provide a health concern.", {
        variant: "error",
      });
    }
    //Invalid Budget:
    if (!formData.budget) {
      setLoading(false);
      return enqueueSnackbar("Please provide a budget.", {
        variant: "error",
      });
    }
    //Invalid Travelers:
    if (!formData.noOfPeople) {
      setLoading(false);
      return enqueueSnackbar("Please specify the number of travelers.", {
        variant: "error",
      });
    }

    //Valid Details:
    const finalPrompt = generativeAIPrompt
      .replace("{location}", formData?.location?.label)
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{noOfPeople}", formData?.noOfPeople)
      .replace("{budget}", formData?.budget)
      .replace("{location}", formData?.location?.label)
      .replace("{healthConcern}", formData?.healthConcern?.label);

    //Pass Result To Gemini API:
    const result = await chatSession.sendMessage(finalPrompt);
    //Save To The Database:
    if (result?.response?.text()) {
      setLoading(false);
      saveAIPlans(result?.response?.text());
    }
  };

  const saveAIPlans = async (WellnessData) => {
    setLoading(true);
    // Generate Unique String Document Name Like: ObjectId In MongoDb
    const docId = Date.now().toString();
    //Get The UserInfo For The DataBase:
    const user = JSON.parse(Cookies.get("user"));
    await setDoc(doc(db, "AIPlans", docId), {
      userSelection: formData,
      wellnessData: JSON.parse(WellnessData),
      userEmail: user?.email,
      id: docId,
    });
    enqueueSnackbar("Successfully Created A Wellness Plan!", {
      variant: "success",
    });
    setLoading(false);
    //Redirect After Saving To DB:
    navigate(`/view-plan/${docId}`);
  };

  //Rendering Logic:
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      {/* Header Portion */}
      <Header />
      {/* Description */}
      <div className="w-[95%] h-[25vh] lg:h-[20vh] mb-[2rem] bg-transparent flex flex-col justify-center items-start p-2">
        <div className="text-[1.45rem] font-bold mb-2">
          Tell us your wellness goals 🧘‍♂️💆‍♀️
        </div>
        <div className="text-[1.05rem] mb-2">
          Just share some basic details, and our wellness planner will create a
          personalized health plan tailored to your needs.
        </div>
      </div>
      {/* Google Locations */}
      <div className="w-[95%] lg:w-[90%] h-[20vh] flex flex-col justify-center items-start bg-transparent p-2 mb-[2rem]">
        <div className="text-[1.15rem] mb-2">
          Where would you like to find hospitals and wellness services?
        </div>
        <div className="w-[95%] h-[10vh] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
      </div>
      {/* Length Of Trip */}
      <div className="h-[20vh] w-[95%] lg:w-[90%] mb-[2rem] flex flex-col justify-center items-start bg-transparent p-2">
        <div className="mb-2 text-[1.15rem]">
          How many days would you like your wellness plan to cover?
        </div>
        <Input
          className="w-[95%] h-[6vh] mb-[2rem] text-[1.05rem] rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
          placeholder="Ex. 3 days"
          type="number"
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
        />
      </div>
      {/* Wellness Concern: */}
      <div className="h-[20vh] w-[95%] lg:w-[90%] mb-[2rem] flex flex-col justify-center items-start bg-transparent p-2">
        <div className="mb-2 text-[1.15rem]">
          What health concerns would you like your wellness plan to address?
        </div>
        <Select
          options={healthConcernsOptions}
          onChange={(selectedOption) =>
            handleInputChange("healthConcern", selectedOption)
          }
          className="w-full mb-[2rem] text-[1.05rem] rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-gray-700"
        />
      </div>
      {/* Budget Of The Trip: */}
      <div className="w-[95%] h-[235vh] lg:h-[100vh] mb-[2rem] flex flex-col justify-center items-start bg-transparent p-2">
        <div className="text-[1.45rem] font-bold mb-2">
          What is your budget?
        </div>
        <div className="text-[1.05rem] mb-2">
          Allocate your budget for health services, wellness plans, and
          activities.
        </div>
        {/* The Budget Choices: */}
        <div className="w-[98%] h-[80vh] lg:h-[40vh] bg-transparent mb-[2rem] flex flex-col justify-start items-center p-2 lg:p-0 lg:flex-row lg:justify-evenly lg:items-center">
          {selectBudgetList.map((item, index) => (
            <div
              key={index}
              className={`w-[95%] h-[25vh] lg:w-[22%] bg-transparent flex flex-col justify-evenly items-center mb-3 lg:mb-0 transition-transform ease-in-out hover:cursor-pointer hover:shadow-md hover:scale-105 hover:bg-gray-300 hover:rounded-md border-2 border-gray-400 ${
                formData?.budget === item.title
                  ? "bg-gray-400 rounded-md shadow-lg scale-105 border-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleInputChange("budget", item.title)}
            >
              <div className="w-[95%] h-[23vh] bg-transparent flex justify-around items-center">
                <div className="w-[75%] h-[20vh] flex flex-col justify-start items-center">
                  <div className="text-[1.25rem] font-bold mb-2">
                    {item.title}
                  </div>
                  <div className="text-[1rem] mb-2 text-center">
                    {item.desc}
                  </div>
                </div>
                <div className="w-[20%] h-[16vh] lg:h-[23vh] text-[3rem] flex justify-center items-center">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Travelling Choices Question: */}
        <div className="text-[1.05rem] mb-2">
          How many people should your wellness plan cover?
        </div>
        {/* The Travelling Choices: */}
        <div className="w-[98%] h-[160vh] lg:h-[44vh] bg-transparent mb-[2rem] flex flex-col justify-start items-center p-2 lg:p-0 lg:flex-row lg:justify-evenly lg:items-center">
          {selectPeopleList.map((item, index) => (
            <div
              key={index}
              className={`w-[95%] h-[28vh] lg:w-[22%] lg:h-[35vh] bg-transparent flex flex-col justify-evenly items-center mb-4 lg:mb-0 transition-transform ease-in-out border-2 border-gray-400 hover:cursor-pointer hover:bg-gray-300 hover:scale-105 hover:rounded-md ${
                formData?.noOfPeople === item.people
                  ? "shadow-lg scale-105 rounded-md border-2 border-blue-500 bg-gray-400"
                  : ""
              }`}
              onClick={() => handleInputChange("noOfPeople", item.people)}
            >
              <div className="w-[95%] h-[16vh] lg:h-[12vh] bg-transparent flex justify-around items-center">
                <div className="w-[75%] h-[14vh] lg:h-[10vh] flex flex-col justify-start items-center">
                  <div className="text-[1.25rem] font-bold mb-2">
                    {item.title}
                  </div>
                  <div className="text-[1rem] mb-2 text-center">
                    {item.people}
                  </div>
                </div>
                <div className="w-[20%] h-[14vh] lg:h-[10vh] text-[3rem]">
                  {item.icon}
                </div>
              </div>
              <div className="w-[95%] h-[10vh] lg:h-[20vh] bg-transparent text-center flex flex-col justify-center items-center p-1">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Generate Button */}
      <div className="mb-[2rem] h-[15vh] w-[95%] bg-transparent flex justify-center items-center">
        <Button
          className="w-[75%] h-[9vh] lg:w-[22%] lg:h-[8vh] text-[1.05rem]"
          onClick={() => handleGeneratePlan()}
          disabled={loading}
        >
          {loading === true ? (
            <>
              {" "}
              <span className="mr-2 text-[1.25rem]">
                Planning your wellness:{" "}
              </span>{" "}
              <FaSpinner className="text-[2rem] animate-spin" />{" "}
            </>
          ) : (
            <> Generate Plan </>
          )}
        </Button>
      </div>
      {/* Generate Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col justify-start items-start">
                <div
                  className="w-[50%] h-[30vh] mb-4"
                  style={{
                    backgroundImage: `url('/Images/yatriXlogoTransparent.png')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="text-[1.35rem] font-bold mb-2">
                  Sign In With Google
                </div>
                <div className="text-[1rem] mb-6">
                  Sign In To The App With Google Authentication Securely
                </div>
                <Button
                  className="w-[50%] h-[8vh] text-[1rem]"
                  onClick={() => logIn()}
                >
                  <span className="mr-2">
                    {" "}
                    <FaGoogle className="h-[8vh] w-[25%]" />{" "}
                  </span>{" "}
                  Sign In With Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Create;
