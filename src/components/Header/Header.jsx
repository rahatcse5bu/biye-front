/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Tittle from "./Title";
import NavBar from "./Navbar";
import { Colors } from "../../constants/colors";
const Header = () => {
  const elementStyle = {
    backgroundColor: Colors.secondary,
    color: Colors.textColor,
  };
  return <NavBar />;
};

export default Header;
