/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Select from "../Select/Select";
import { useQuery } from "@tanstack/react-query";
import { BioDataServices } from "../../services/bioData";
import Input from "../Input/Input";
import { Checkbox } from "@material-tailwind/react";
import { Colors } from "../../constants/colors";
import UserContext from "../../contexts/UserContext";
import { getToken } from "../../utils/cookies";
import toast from "react-hot-toast";
import { useEffect } from "react";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import { AddressInfoServices } from "../../services/addressInfo";
import { Toast } from "../../utils/toast";
import { getErrorMessage } from "../../utils/error";

const AddressInfoForm = ({ userForm, setUserForm }) => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upZilla, setUpZilla] = useState("");
  const [area, setArea] = useState("");
  const [pArea, setPArea] = useState("");
  const [pDivision, setPDivision] = useState("");
  const [pDistrict, setPDistrict] = useState("");
  const [pUpZilla, setPUpZilla] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [grownUp, setGrownUp] = useState("");
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const { data: addressInfo = null, isLoading: addressGetLoading } = useQuery({
    queryKey: ["address-info", userInfo?.data?._id, getToken()?.token],
    queryFn: async () => {
      return await AddressInfoServices.getAddressInfoByUser(getToken()?.token);
    },
    retry: false,
    enabled: !!userInfo?.data?._id,
  });

  const { data: divisionOptions = [] } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      return await BioDataServices.getAllDivisions();
    },
  });

  const { isLoading, data: districtsOptions = [] } = useQuery({
    queryKey: ["districts", division],
    queryFn: async () => {
      return await BioDataServices.getAllDistricts(division);
    },
  });

  const { isLoading: upZillaLoading, data: upZillaOptions = [] } = useQuery({
    queryKey: ["upzillas", district, division],
    queryFn: async () => {
      return await BioDataServices.getAllUpzilla(district);
    },
  });

  const { data: pDivisionOptions = [] } = useQuery({
    queryKey: ["pdivisions"],
    queryFn: async () => {
      return await BioDataServices.getAllDivisions();
    },
  });

  const { pDistrictLoading, data: pDistrictsOptions = [] } = useQuery({
    queryKey: ["pdistricts", pDivision],
    queryFn: async () => {
      return await BioDataServices.getAllDistricts(pDivision);
    },
  });

  const { isLoading: pUpZillaLoading, data: pUpZillaOptions = [] } = useQuery({
    queryKey: ["pupzillas", pDistrict, pDivision],
    queryFn: async () => {
      return await BioDataServices.getAllUpzilla(pDistrict);
    },
  });

  useEffect(() => {
    if (addressInfo?.data) {
      const {
        zilla,
        upzilla,
        division,
        present_area,
        permanent_area,
        present_address,
        grown_up,
        permanent_address,
      } = addressInfo.data;
      setUpZilla(upzilla);
      setDivision(division);
      setDistrict(zilla);
      setGrownUp(grown_up);
      setArea(permanent_area);
      setPArea(present_area);
      if (present_address === permanent_address) {
        setPUpZilla(upzilla);
        setPDistrict(zilla);
        setPDivision(division);
      } else {
        const address = present_address.split(",");
        setPDivision(address[0].trim());
        setPDistrict(address[1].trim());
        setPUpZilla(address[2].trim());
      }
    }
  }, [addressInfo]);

  const backButtonHandler = () => {
    if (userForm > 1) {
      setUserForm((prev) => prev - 1);
    }
  };
  const checkBoxHandler = () => {
    setIsCheck((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const addressData = {
      user_id: userInfo?.data?._id,
      permanent_address: `${division},${district},${upZilla}`,
      present_address: isCheck
        ? `${division},${district},${upZilla}`
        : `${pDivision},${pDistrict},${pUpZilla}`,
      grown_up: grownUp,
      zilla: district,
      upzilla: upZilla,
      division: division,
      present_zilla: isCheck ? district : pDistrict,
      present_upzilla: isCheck ? upZilla : pUpZilla,
      present_division: isCheck ? division : pDivision,
      city: district,
      permanent_area: area,
      present_area: isCheck ? area : pArea,
      zip: 1,
    };

    if (!getToken()?.token) {
      alert("Please logout and try again");
      return;
    }

    if (!userInfo?.data?._id) {
      alert("Please login and try again");
      return;
    }

    console.log(addressInfo);

    try {
      setLoading(true);
      let data;
      if (addressInfo?.success === true) {
        data = await AddressInfoServices.updateAddressInfo(
          addressData,
          getToken()?.token
        );
      } else {
        data = await AddressInfoServices.createAddressInfo(
          {
            ...addressData,
            user_form: userForm,
          },
          getToken()?.token
        );
      }

      if (data.success) {
        toast.success("আপনার তথ্য সেভ করা হয়েছে ", {
          position: "bottom-right",
          duration: 3000,
          style: { backgroundColor: "green", color: "#fff" },
        });
        setUserForm((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      const errorMsg = getErrorMessage(error);
      Toast.errorToast(errorMsg);
      //! for token error redirect to logout
      // if (errorMsg.includes("You are not authorized")) {
      //   await logOut();
      //   removeToken();
      //   navigate("/");
      // }
    } finally {
      setLoading(false);
    }
  };

  // console.log(districtsOptions);
  // console.log(division);

  console.log(userInfo);
  return (
    <div className="mt-5">
      <h3
        style={{ color: Colors.titleText }}
        className="text-2xl font-semibold mb-3"
      >
        ঠিকানা
      </h3>
      <hr />
      {addressGetLoading ? (
        <LoadingCircle />
      ) : (
        <form action="" onSubmit={submitHandler} className="w-full mt-5">
          <div>
            <h3 className="text-left text-2xl">স্থায়ী ঠিকানা </h3>
            <Select
              title="আপনার বিভাগ নির্বাচন করুন"
              value={division}
              setValue={setDivision}
              options={divisionOptions}
              required={true}
            />

            {isLoading ? (
              <div>Loading</div>
            ) : (
              division &&
              districtsOptions?.length > 0 && (
                <Select
                  title="আপনার জেলা  নির্বাচন করুন"
                  value={district}
                  setValue={setDistrict}
                  options={districtsOptions}
                  required={true}
                />
              )
            )}
            {upZillaLoading ? (
              <div>Loading</div>
            ) : (
              district &&
              upZillaOptions?.length > 0 && (
                <Select
                  title="আপনার উপজেলা  নির্বাচন করুন"
                  value={upZilla}
                  setValue={setUpZilla}
                  options={upZillaOptions}
                  required={true}
                />
              )
            )}
            <Input
              placeholder="এলাকার নাম লিখুন"
              value={area}
              setValue={setArea}
              subtitle="বাসার নাম্বার না লিখে শুধু গ্রাম বা এলাকার নাম লিখুন। যেমন- জুমির খান সড়ক,আলেকান্দা ।"
              required
            />
          </div>

          <div className="flex my-2 items-center">
            <Checkbox color="teal" onChange={checkBoxHandler} />
            <label>স্থায়ী ও বর্তমান ঠিকানা একই</label>
          </div>

          {!isCheck && (
            <div>
              <h3 className="text-left text-2xl">বর্তমান ঠিকানা </h3>
              <Select
                title="আপনার বিভাগ নির্বাচন করুন"
                value={pDivision}
                setValue={setPDivision}
                options={pDivisionOptions}
                required={true}
              />

              {pDistrictLoading ? (
                <div>Loading</div>
              ) : (
                pDivision &&
                pDistrictsOptions?.length > 0 && (
                  <Select
                    title="আপনার জেলা  নির্বাচন করুন"
                    value={pDistrict}
                    setValue={setPDistrict}
                    options={pDistrictsOptions}
                    required={true}
                  />
                )
              )}
              {pUpZillaLoading ? (
                <div>Loading</div>
              ) : (
                pDistrict &&
                pUpZillaOptions?.length > 0 && (
                  <Select
                    title="আপনার উপজেলা  নির্বাচন করুন"
                    value={pUpZilla}
                    setValue={setPUpZilla}
                    options={pUpZillaOptions}
                    required={true}
                  />
                )
              )}

              <Input
                placeholder="এলাকার নাম লিখুন"
                value={pArea}
                setValue={setPArea}
                required
              />
            </div>
          )}
          <br />
          <Input
            title="কোথায় বড় হয়েছেন ?"
            value={grownUp}
            setValue={setGrownUp}
            required
          />

          <div className="flex items-center my-5 justify-between">
            <button
              type="button"
              onClick={backButtonHandler}
              className="bg-gray-700 text-xl  px-5 text-white py-2  rounded-3xl"
            >
              Back
            </button>
            <button
              type="submit"
              className=" text-xl rounded-3xl  px-5 text-white py-2 "
              style={{
                background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight})`,
              }}
            >
              {loading ? <LoadingCircle /> : "Save & Next"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressInfoForm;
