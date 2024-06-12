import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { FaGoogle } from "react-icons/fa";
import { Colors } from "../../constants/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { userServices } from "../../services/user";
import { setToken } from "../../utils/cookies";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { Toast } from "../../utils/toast";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleGoogleSignIn, signIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/user/account/dashboard";
  const navigate = useNavigate();
  const googleSignin = async () => {
    try {
      // google signin
      const response1 = await handleGoogleSignIn();

      if (!response1?.user?.uid) {
        alert("Something went wrong,try again later");
        return;
      }

      const userInfo = {
        email: response1?.user?.email,
      };

      //store user info into db
      const { data } = await userServices.createUserInfoForGoogleSignIn(
        userInfo
      );

      // console.log("response2~~", data);

      if (data?.success === true && data?.data) {
        setToken({
          token: data?.data.token,
        });

        navigate(from, {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //! signin with email and password
  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!email && !password) {
      Toast.errorToast("Fill all the blank fields");
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
      const userInfo = {
        email: email,
      };
      //!store user info into db
      const { data } = await userServices.createUserInfoForGoogleSignIn(
        userInfo
      );

      // console.log(data);
      if (data?.success === true && data?.data) {
        setToken({
          token: data?.data.token,
        });
        navigate(from, {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.errorToast("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleforgotPasswordButtonHandler = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex justify-center my-5">
      <Card
        color="transparent"
        className="mx-auto lg:w-[50%] w-[95%] border-2 p-4"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>

        <form className="w-full mt-8 mb-2">
          <div className="flex flex-col gap-6 mb-4">
            <Input
              size="lg"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            onClick={handleSignIn}
            className="py-4 mt-6"
            fullWidth
            disabled={loading}
            style={{
              background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
            }}
          >
            {loading ? <LoadingCircle /> : "Login"}
          </Button>
          <p
            onClick={handleforgotPasswordButtonHandler}
            className="mt-5 text-right cursor-pointer"
            style={{ color: Colors.pncPrimaryColor }}
          >
            Forgot Password
          </p>
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
            onClick={googleSignin}
          >
            <div className="flex items-center justify-center">
              <FaGoogle className="w-5 h-5 mb-1 mr-2" />
              Sign in with Google
            </div>
          </Button>
          <Typography color="gray" className="mt-4 font-normal text-center">
            <span className="mr-2"> Not a Member ?</span>
            <Link to="/signup" href="#" className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
