//Imports:
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Fetching The Plans:
const Plans = () => {
  //Navigating:
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserPlans();
  });
  //Fetching The User Plans:
  const fetchUserPlans = () => {
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    if (!user) {
      navigate("/");
    }
  };
  return <div>Plans</div>;
};

export default Plans;
