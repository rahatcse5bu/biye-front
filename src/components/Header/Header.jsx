/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Tittle from "./Title";
import NavBar from "./Navbar";
import { Colors } from "../../constants/colors";
import { useEffect, useContext } from "react";
import { getToken, removeToken } from "../../utils/cookies";
import UserContext from "../../contexts/UserContext";

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(atob(base64));

    const currentTime = Date.now() / 1000;
    const remainingTimeInSeconds = jsonPayload.exp - currentTime;
    const remainingDays = Math.floor(remainingTimeInSeconds / (60 * 60 * 24));
    // console.log("jsonPayload", jsonPayload);
    // console.log("remainingDays", remainingDays);

    return jsonPayload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const Header = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(UserContext);
  // check expired
  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (isTokenExpired(getToken()?.token)) {
        // Redirect to login page or perform other actions
        await logOut();
        removeToken();
        navigate("/login");
      }
    };

    // Check immediately when the component mounts
    checkTokenExpiration();

    // Set up an interval to check the token expiration every minute (60000 milliseconds)
    const intervalId = setInterval(checkTokenExpiration, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [logOut, navigate]);

  const elementStyle = {
    backgroundColor: Colors.secondary,
    color: Colors.textColor,
  };
  return <NavBar />;
};

export default Header;
