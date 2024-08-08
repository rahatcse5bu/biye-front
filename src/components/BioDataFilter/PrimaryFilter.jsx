/* eslint-disable react/prop-types */
import DoubleRangeSlider from "../DoubleRangeSlider/DoubleRangeSlider";
import {
  Typography,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useBio } from "../../contexts/BioContext";
import { convertToQuery } from "../../utils/query";
import { BioDataServices } from "../../services/bioData";
import { useQuery } from "@tanstack/react-query";

const PrimaryFilter = ({
  openAccordions,
  handleToggle,
  setBioType,
  bioType,
  maritalStatus,
  setMaritalStatus,
  age,
  setAge,
  height,
  setHeight,
  setOpenAccordions,
}) => {
  const { setQuery, query, setFilterFields, filterFields } = useBio();
  const navigate = useNavigate();
  const { data: divisionOptions, isLoading: divisionLoading } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const divisions = await BioDataServices.getAllDivisions();
      const allDivisionsOption = {
        value: "All Divisions",
        label: "All Divisions",
      };
      const formattedDivisionOptions = divisions.map((division) => ({
        value: division.value,
        label: division.value,
      }));
      formattedDivisionOptions.unshift(allDivisionsOption);
      return formattedDivisionOptions;
    },
  });
  return (
    <Accordion
      // open={open === 3}
      open={openAccordions["3"]}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4  transition-transform ${
            open === 3 ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0 " selected={openAccordions["3"]}>
        <AccordionHeader
          onClick={() => handleToggle(3)}
          className="p-3 border-b-0"
        >
          <Typography color="gray" className="mr-auto font-normal">
            প্রাথমিক
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1 my-2 ">
        <div className="lg:w-64 w-full">
          <label
            htmlFor="select"
            className="block my-2 text-sm font-bold text-left text-gray-700"
          >
            আমি খুজছি
          </label>
          <div className="relative">
            <select
              id="select"
              name="select"
              onChange={(e) => {
                const value = e.target.value;

                setBioType(value);

                setQuery((prev) => {
                  return {
                    ...prev,
                    bio_type: value,
                  };
                });

                const queryString = convertToQuery({
                  ...query,
                  bio_type: value,
                });

                setFilterFields((filterFields) => {
                  return {
                    ...filterFields,
                    bio_type: value,
                  };
                });

                setOpenAccordions((prev) => {
                  return {
                    ...prev,
                    3: true,
                  };
                });
                navigate(`/biodatas?${queryString}`);
              }}
              value={bioType}
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
            >
              <option value="">সকল</option>
              <option value="পাত্রের বায়োডাটা">পাত্রের বায়োডাটা</option>
              <option value="পাত্রীর বায়োডাটা"> পাত্রীর বায়োডাটা </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="lg:w-64 w-full">
          <label
            htmlFor="select"
            className="block my-2 text-sm font-bold text-left text-gray-700"
          >
            বৈবাহিক অবস্থা
          </label>
          <div className="relative">
            <select
              id="select"
              name="select"
              value={maritalStatus}
              onChange={(e) => {
                const value = e.target.value;

                setMaritalStatus(value);

                setQuery((prev) => {
                  return {
                    ...prev,
                    marital_status: value,
                  };
                });
                // console.log("query~~", query);
                const queryString = convertToQuery({
                  ...query,
                  marital_status: value,
                });

                setOpenAccordions((prev) => {
                  return {
                    ...prev,
                    3: true,
                  };
                });
                setFilterFields((filterFields) => {
                  return {
                    ...filterFields,
                    bio_type: value,
                  };
                });
                navigate(`/biodatas?${queryString}`);
              }}
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
            >
              <option value="">সকল</option>
              <option value="অবিবাহিত"> অবিবাহিত </option>
              <option value="বিবাহিত">বিবাহিত</option>
              <option value="বিবাহিত"> ডিভোর্সড</option>
              <option value="বিধবা">বিধবা</option>
              <option value="বিপত্নীক">বিপত্নীক </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="px-2">
          <label className="text-left text-gray-500 mt-4 mb-5 font-bold block">
            বয়স
          </label>
          <DoubleRangeSlider value={age} setValue={setAge} />
        </div>
        <div className="lg:w-64 w-full px-2 py-2">
          <DoubleRangeSlider
            value={height}
            setValue={setHeight}
            maxValue={7.0}
            minValue={4.5}
            step={0.1}
            title="উচ্চতা"
            subtitle="5.1 বোঝায় ৫ ফুট ১ ইঞ্চি "
          />
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default PrimaryFilter;
