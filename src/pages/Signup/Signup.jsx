import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { FaGoogle } from "react-icons/fa";
import "./signup.css";
import { Colors } from "../../constants/colors";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { userServices } from "../../services/user";
import { setToken } from "../../utils/cookies";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { sendFirebaseError } from "../../utils/fiirebaseError";
import toast from "react-hot-toast";
import { Toast } from "../../utils/toast";
import AnalyticsService from "../../firebase/analyticsService";
export function Signup() {
  const { handleGoogleSignIn, createUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const googleSignup = async () => {
    try {
      //! google signIn
      const response1 = await handleGoogleSignIn();
      if (!response1?.user?.uid) {
        alert("Something went wrong,try again later");
        return;
      }
      // console.log(response1?.user);

      const user = response1.user;
      AnalyticsService.setUserId(user.uid);
      AnalyticsService.setUserProperties({ email: user.email });

      const userInfo = {
        email: response1?.user.email,
        username,
        gender,
      };

      //!store user info into db
      const { data } = await userServices.createUserInfoForGoogleSignIn(
        userInfo,
        response1?._tokenResponse.idToken
      );
      console.log(data);
      if (data?.success === true) {
        setToken({
          token: data?.data.token,
        });
        navigate("/user/account/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || error.message);
    }
  };

  //! signUp with email and password
  const signInWithEmailAndPassword = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      //	alert("Invalid Email");
      toast.error("Invalid Email", {
        duration: 5000,
        position: "bottom-right",
        style: { backgroundColor: "red", color: "#fff" },
      });
      return;
    }
    if (!email || !password || !username || !gender) {
      //alert("Fill all the input fields");
      toast.error("Fill all the input fields", {
        duration: 5000,
        position: "bottom-right",
        style: { backgroundColor: "red", color: "#fff" },
      });
      return;
    }

    if (password.length < 5) {
      //	alert("Password should be at least six characters");
      toast.error("Password should be at least six characters", {
        duration: 5000,
        position: "bottom-right",
        style: { backgroundColor: "red", color: "#fff" },
      });
      return;
    }

    try {
      //! create user in firebase
      setLoading(true);

      const response1 = await createUser(email, password);

      // analytics

      const user = response1.user;
      AnalyticsService.setUserId(user.uid);
      AnalyticsService.setUserProperties({ email: user.email });

      if (!response1?.user?.uid) {
        Toast.errorToast("Something went wrong,please try again");
        return;
      }

      const userInfo = {
        email,
        username,
        gender,
      };

      // console.log(response1);
      //store user info into db
      const { data } = await userServices.createUserInfoForGoogleSignIn(
        userInfo,
        response1?._tokenResponse.idToken
      );
      // console.log(data);
      if (data?.success === true) {
        setEmail("");
        setPassword("");
        setUsername("");
        setGender("");
        setToken({
          token: data?.data.token,
        });
        navigate("/user/account/dashboard");
      }
    } catch (error) {
      //alert(error?.response?.data?.message || error.message);
      toast.error(
        sendFirebaseError(error?.response?.data?.message || error.message),
        {
          duration: 5000,
          position: "bottom-right",
          style: { backgroundColor: "red", color: "#fff" },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-5">
      <Card
        color="transparent"
        className="mx-auto lg:w-[50%] w-[95%] border-2 p-4"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal ">
          Enter your details to register.
        </Typography>
        <form className="w-full mt-8 mb-2">
          <div className="flex flex-col gap-6 mb-4">
            <Input
              size="lg"
              onChange={(e) => setUsername(e.target.value)}
              label="Name"
              name="username"
            />
            <Input
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              name="email"
            />
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              label="Password"
              name="password"
            />
            <div className="relative">
              <select
                onChange={(e) => setGender(e.target.value)}
                className="block w-full px-4 py-3 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              >
                <option value="সিলেক্ট লিঙ্গ">সিলেক্ট লিঙ্গ</option>
                <option value="পুরুষ">পুরুষ</option>
                <option value="মহিলা">মহিলা</option>
              </select>
            </div>
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            type="submit"
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
            }}
            onClick={signInWithEmailAndPassword}
            className="py-4 mt-6"
            fullWidth
            disabled={loading}
          >
            {loading ? <LoadingCircle /> : "Register"}
          </Button>

          <div className="flex items-center my-4">
            <p className="h-[1px] bg-gray-600 w-full"></p>
            <span className="mx-2">OR</span>{" "}
            <p className="h-[1px] bg-gray-600 w-full"></p>
          </div>
          <Button
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
            }}
            className="w-full "
          >
            <div
              onClick={googleSignup}
              className="flex items-center justify-center"
            >
              <FaGoogle className="w-5 h-5 mb-1 mr-2" />
              Sign Up with Google
            </div>
          </Button>
          <Typography color="gray" className="mt-4 font-normal text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Log In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
