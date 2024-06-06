/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingCircle from "../components/LoadingCircle/LoadingCircle";
import UserContext from "../contexts/UserContext";

const PrivateRoute = ({ children }) => {
  const { userInfo, userLoading, userInfoFetchLoading } =
    useContext(UserContext);
  const location = useLocation();

  if (userLoading || userInfoFetchLoading) {
    return <LoadingCircle />;
  }

  if (userInfo?.data?._id) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
