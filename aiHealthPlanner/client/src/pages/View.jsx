import { db } from "@/services/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Information from "@/components/custom/Information";
import Header from "@/components/custom/Header";
import Clinic from "@/components/custom/Clinic";
const View = () => {
  const { enqueueSnackbar } = useSnackbar();
  //Set The State For Application:
  const [wellnessPlan, setWellnessPlan] = useState([]);
  //Fetch Id From Params:
  const { id } = useParams();
  //Fetch The Data From Database:
  useEffect(() => {
    const getWellnessData = async () => {
      //Document Reference:
      const docRef = doc(db, "AIPlans", id);
      //Document Snap:
      const docSnap = await getDoc(docRef);
      //If data Exists:
      if (docSnap.exists()) {
        enqueueSnackbar("Data Found!", { variant: "success" });
        setWellnessPlan(docSnap.data());
      } else {
        enqueueSnackbar("No Such Data Id Found In DB!", { variant: "error" });
      }
    };
    //If Id Is Provided Then Try To Fetch Data From DB!
    id && getWellnessData();
  }, [enqueueSnackbar, id]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      {/* Header Section */}
      <Header />
      {/* Information Section */}
      <Information planInfo={wellnessPlan} />
      {/* Recommended Hospitals/Clinics/Wellness Buildings */}
      <Clinic planInfo={wellnessPlan} />
      {/* Each Day Plans */}
    </div>
  );
};

export default View;
