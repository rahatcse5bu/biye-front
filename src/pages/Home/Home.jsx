import "../../assets/styles/home.css";
import { Colors } from "../../constants/colors";
import FeaturedBioDataGrid from "../../components/FeaturedBioDataGrid/FeaturedBioDataGrid";
import HadithSlider from "../../components/HadithSlider/HadithSlider";
import { useState, useEffect } from "react";
import { BioDataServices } from "../../services/bioData";
import { useNavigate } from "react-router-dom";
import { convertToQuery } from "../../utils/query";
import Select from "react-select";
import "../../fonts/fonts.css";
import { useQuery } from "@tanstack/react-query";
import { GeneralInfoServices } from "../../services/generalInfo";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { useBio } from "../../contexts/BioContext";

const Home = () => {
  const navigate = useNavigate();
  const { setQuery } = useBio();
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ["general-info", "featured"],
    queryFn: async () =>
      GeneralInfoServices.getALLGeneralInfo({ isFeatured: true }),
  });
  const { data: biosStats, isLoading: bioStatsLoading } = useQuery({
    queryKey: ["bio-all-stats"],
    queryFn: async () => BioDataServices.getAllBioDataStats(),
  });

  // console.log("biosStats~~~", biosStats);
  // console.log(data);

  useEffect(() => {
    //! Fetch division options when the component mounts
    const fetchDivisionOptions = async () => {
      const divisions = await BioDataServices.getAllDivisions();
      if (divisions) {
        const allDivisionsOption = {
          value: "All Divisions",
          label: "All Divisions",
        };
        const formattedDivisionOptions = divisions.map((division) => ({
          value: division.value,
          label: division.value,
        }));
        formattedDivisionOptions.unshift(allDivisionsOption);
        setDivisionOptions(formattedDivisionOptions);
      }
    };

    fetchDivisionOptions();
  }, []);

  useEffect(() => {
    //! Fetch district options based on selected divisions
    const fetchDistrictOptions = async () => {
      const selectedDivisionValues = selectedDivisions.map(
        (division) => division.value
      );

      if (selectedDivisionValues.includes("All Divisions")) {
        // If "All Divisions" is selected, set all districts as selected
        const allDistricts = await BioDataServices.getAllDistricts(null);
        const allDistrictsOption = {
          value: "All Districts",
          label: "All Districts",
        };
        const formattedAllDistricts = allDistricts.map((district) => ({
          value: district.value,
          label: district.label,
        }));
        formattedAllDistricts.unshift(allDistrictsOption);
        setDistrictOptions(formattedAllDistricts);
      } else if (selectedDivisionValues.length === 0) {
        // Clear district options and add "All Districts" as an initial option
        const allDistrictsOption = {
          value: "All Districts",
          label: "All Districts",
        };
        setDistrictOptions([allDistrictsOption]);
      } else {
        // Fetch district options for selected divisions
        const districtPromises = selectedDivisionValues.map((divisionValue) => {
          return BioDataServices.getAllDistricts(divisionValue);
        });

        Promise.all(districtPromises).then((results) => {
          const formattedDistrictOptions = results.flatMap(
            (districts, index) => {
              return districts.map((district) => ({
                value: district.value,
                label: district.label,
                division: selectedDivisionValues[index],
              }));
            }
          );

          // Add "All Districts" as an initial option
          const allDistrictsOption = {
            value: "All Districts",
            label: "All Districts",
          };
          formattedDistrictOptions.unshift(allDistrictsOption);

          setDistrictOptions(formattedDistrictOptions);
        });
      }
    };

    fetchDistrictOptions();
  }, [selectedDivisions]);

  const handleDivisionChange = (selectedOptions) => {
    setSelectedDivisions(selectedOptions);

    if (selectedOptions.some((option) => option.value === "All Divisions")) {
      //! If "All Divisions" is selected, clear selected districts
      setSelectedDistricts(["all"]);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const marital_status = form.marital_status.value;
    const bio_type = form.bio_type.value;

    //! Handle "All Divisions" and "All Districts" selections
    let divisionValues = selectedDivisions.map((division) => division.value);
    let districtValues = selectedDistricts.map((district) => district.value);

    if (divisionValues.includes("All Divisions")) {
      // divisionValues.splice(0, divisionValues.length);
      //! If "All Divisions" is selected, set the selected districts to include all districts
      // districtValues = districtOptions
      // 	.filter((district) => !districtValues.includes(district.value))
      // 	.map((district) => district.value);
      divisionValues = ["all"];
    }
    if (districtValues.includes("All Districts")) {
      districtValues.splice(0, districtValues.length);
      //! Add all districts for selected divisions
      const selectedDivisionValues = selectedDivisions.map(
        (division) => division.value
      );
      const allDistricts = districtOptions
        .filter((district) =>
          selectedDivisionValues.includes(district.division)
        )
        .map((district) => district.value);
      districtValues.push(...allDistricts);
    }
    // console.log(districtValues, divisionValues);

    const query = {
      marital_status,
      bio_type,
      zilla: districtValues.join(","),
      division: divisionValues.join(","),
    };

    // set query
    setQuery((prev) => {
      return {
        ...prev,
        ...query,
      };
    });

    // convert query to string
    const queryString = convertToQuery(query);

    navigate(`/biodatas?${queryString}`);
  };
  // console.log(zillasOptions);

  return (
    <div className="px-10">
      <div className="pt-6 text-3xl font-bold home-titlee md:text-4xl lg:text-5xl">
        <h1>বাংলাদেশী ইসলামিক</h1>
        <h1>
          ম্যাট্রিমনি{" "}
          <span
            style={{
              color: Colors.titleText,
            }}
            className="font-bold text-4xl"
          >
            PNC নিকাহ
          </span>
        </h1>
      </div>
      <div className="mt-4 mb-4 text-3xl home-subtitlee md:text-4xl lg:text-5xl">
        <h3>আপনার নিজ উপজেলায় দ্বীনদার পাত্রপাত্রী খুঁজুন খুব সহজে</h3>
      </div>
      <div className="home-desc border border-gray-300 rounded-xl py-4 md:py-8">
        <p className="text-xl content md:text-2xl lg:text-3xl">
          যে ব্যক্তি বিয়ে করলো সে তার অর্ধেক দ্বীন পূর্ণ করে ফেললো। বাকি
          অর্ধেকের জন্য সে আল্লাহকে ভয় করুক।
        </p>
        <p
          style={{
            color: Colors.titleText,
          }}
          className="text-sm ref md:text-xl lg:text-2xl"
        >
          (বায়হাকী, শু&rsquo;আবুল ঈমান - ৫৪৮৬)
        </p>
      </div>
      {/* Advertisement Starts  */}
      <div
        style={{
          background: `linear-gradient(to right, ${Colors.lnLeft}, ${Colors.lnRight})`,
        }}
        className="relative max-w-screen-lg px-8 py-4 mx-auto my-4 text-white bg-blue-500 md:flex md:items-center md:justify-around md:p-16 lg:rounded-xl"
      >
        <div className="mb-10 mr-10 md:mb-0">
          <h2 className="max-w-lg mb-8 text-3xl font-bold sm:text-3xl">
            PNC Soft Tech - একটি সফটওয়্যার ডেভেলপমেন্ট কম্পানি
          </h2>
          <ul className="flex flex-wrap max-w-xl gap-4">
            <li className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-300"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="text-gray-100">ব্যক্তিগত ওয়েবসাইট/অ্যাপ</p>
            </li>
            <li className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-300"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="text-gray-100">ব্যবসায়ীক ওয়েবসাইট/অ্যাপ</p>
            </li>
            <li className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-300"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="text-gray-100">কম্পানির ওয়েবসাইট/অ্যাপ</p>
            </li>
            <li className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-300"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="text-gray-100">
                শিক্ষা প্তিষ্ঠানের ওয়েবসাইট/অ্যাপ
              </p>
            </li>
            <li className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-green-300"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="text-gray-100">ই-কমার্স ওয়েবসাইট/অ্যাপ</p>
            </li>
          </ul>
        </div>
        <div className="whitespace-nowrap">
          <button className="px-4 py-3 font-medium text-white transition shadow-md focus:outline-4 rounded-xl bg-emerald-400 outline-white hover:bg-emerald-500">
            <a
              href="https://wa.me/+8801793278360"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white"
            >
              {" "}
              মেসেজ দিন{" "}
            </a>
          </button>
        </div>
        <a
          href="https://pncsofttech.xyz"
          target="_blank"
          rel="noreferrer"
          className="absolute text-sm text-white bottom-4 right-4"
        >
          আমাদের ওয়েবসাইট
        </a>
        <div className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white bg-orange-500 ">
          <span className="uppercase">Ad</span>
        </div>
      </div>
      {/* Advertisement Ends  */}

      <form
        onSubmit={submitHandler}
        className="px-4 py-5 mx-auto my-5 bg-white border-2 shadow-sm search-filter rounded-2xl lg:px-8 lg:p-16 lg:flex lg:items-center lg:justify-between"
      >
        {/* Dropdown 1 */}
        <div className="mb-4 lg:mb-0">
          <label
            className="block mb-2 text-xl md:text-2xl lg:text-2xl lg:inline-block lg:mb-0 lg:mr-4"
            style={{
              color: Colors.titleText,
            }}
          >
            আমি খুঁজছি:
          </label>
          <div className="md:h-2"></div>
          <select
            name="bio_type"
            className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md lg:w-auto md:px-8 md:py-4"
          >
            <option value="" selected>
              সকল
            </option>
            <option value="পাত্রের বায়োডাটা">পাত্রের বায়োডাটা</option>
            <option value="পাত্রীর বায়োডাটা">পাত্রীর বায়োডাটা</option>
          </select>
        </div>

        {/* Dropdown 2 */}
        <div className="mb-4 lg:mb-0">
          <label
            className="block mb-2 text-xl md:text-2xl lg:text-2xl lg:inline-block lg:mb-0 lg:mr-4"
            style={{
              color: Colors.titleText,
            }}
          >
            বৈবাহিক অবস্থা:
          </label>
          <div className="md:h-2"></div>
          <select
            name="marital_status"
            className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md lg:w-auto md:px-8 md:py-4"
          >
            <option value="" selected>
              সকল
            </option>
            <option value="অবিবাহিত">অবিবাহিত</option>
            <option value="বিবাহিত">বিবাহিত</option>
            <option value="ডিভোর্সড">ডিভোর্সড</option>
            <option value="বিধবা">বিধবা</option>
            <option value="বিপত্নীক">বিপত্নীক</option>
          </select>
        </div>

        {/* Dropdown 3 */}
        <div className="mb-4 lg:max-w-[410px] lg:mb-0">
          <label
            className="block mb-4 text-xl md:text-2xl lg:text-2xl lg:inline-block lg:mb-0 lg:mr-4"
            style={{
              color: Colors.titleText,
            }}
          >
            স্থায়ী ঠিকানা:
          </label>
          <div className="md:h-2"></div>

          <Select
            className=""
            options={divisionOptions}
            onChange={handleDivisionChange}
            value={selectedDivisions}
            placeholder="Select Division(s)"
            isMulti
          />
          <p className="py-2"></p>
          <Select
            className=""
            options={districtOptions}
            onChange={setSelectedDistricts}
            value={selectedDistricts}
            placeholder="Select District(s)"
            isMulti
          />
        </div>

        {/* Filter Button */}
        <button
          className="block w-full px-4 py-2 text-xl text-white bg-blue-500 rounded-lg lg:w-auto lg:px-8 lg:py-2 md:mt-8 lg:text-2xl"
          style={{
            background: `linear-gradient(to right,${Colors.lnLeft},${Colors.lnRight} )`,
          }}
          type="submit"
        >
          খুঁজুন
        </button>
      </form>

      <div className="mt-5">
        {isLoading ? (
          <LoadingCircle classes="my-5" />
        ) : (
          <FeaturedBioDataGrid data={data?.data || []} />
        )}
      </div>

      <h2 className="my-4 text-xl text-center text-blue-700 md:text-2xl lg:text-4xl">
        বিয়ে সম্পর্কিত কুরআনের কিছু আয়াত ও কিছু হাদিসঃ
      </h2>

      <HadithSlider />

      <h2
        className="mt-8 mb-2 text-xl font-bold text-center md:text-2xl lg:text-4xl text-uppercase"
        style={{
          color: Colors.titleText,
        }}
      >
        এক নজরে আমাদের সাইটঃ
      </h2>
      {bioStatsLoading ? (
        <LoadingCircle />
      ) : (
        <div className="grid grid-cols-1 py-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 py-12 m-2 bg-white border border-blue-500 shadow-xl stat-card rounded-xl">
            <h1 className="text-3xl font-semibold text-center">
              {biosStats?.data.total}
            </h1>
            <h3 className="text-xl text-center ">সর্বমোট বায়োডাটা</h3>
          </div>
          <div className="p-4 py-12 m-2 bg-white border border-blue-500 shadow-xl stat-card rounded-xl">
            <h1 className="text-3xl font-semibold text-center">
              {biosStats?.data.মহিলা}
            </h1>
            <h3 className="text-xl text-center ">সর্বমোট পাত্রের বায়োডাটা</h3>
          </div>
          <div className="p-4 py-12 m-2 bg-white border border-blue-500 shadow-xl stat-card rounded-xl">
            <h1 className="text-3xl font-semibold text-center">
              {biosStats?.data.পুরুষ}
            </h1>
            <h3 className="text-xl text-center ">সর্বমোট পাত্রীর বায়োডাটা</h3>
          </div>
          <div className="p-4 py-12 m-2 bg-white border border-blue-500 shadow-xl stat-card rounded-xl">
            <h1 className="text-3xl font-semibold text-center">0</h1>
            <h3 className="text-xl text-center ">বিয়ে সম্পন্ন হয়েছে</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
