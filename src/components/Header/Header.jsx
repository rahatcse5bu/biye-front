/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Tittle from "./Title";
import NavBar from "./Navbar";
import { Colors } from "../../constants/colors";
import { useEffect, useContext } from "react";
import { getToken, removeToken } from "../../utils/cookies";
import UserContext from "../../contexts/UserContext";
import { Toast } from "../../utils/toast";

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Toast.tipsToast(
      "If you have any technical issues,please logout and login again"
    );
  }, []);

  const elementStyle = {
    backgroundColor: Colors.secondary,
    color: Colors.textColor,
  };
  return (
    <>
      <NavBar />
    </>
  );
};

export default Header;
