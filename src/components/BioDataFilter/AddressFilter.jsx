/* eslint-disable react/prop-types */
import {
  Typography,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import { useBio } from "../../contexts/BioContext";

const AddressFilter = ({
  openAccordions,
  handleToggle,
  division,
  setDivision,
  setZilla,
  zilla,
}) => {
  const [searchParams] = useSearchParams();
  const { setQuery } = useBio();

  useEffect(() => {
    setDivision(searchParams.get("division"));
    setZilla(searchParams.get("zilla"));
  }, [searchParams, setDivision, setZilla]);

  useEffect(() => {
    let queryObj = {};
    if (division) {
      queryObj = {
        ...queryObj,
        division: division,
      };
    }

    if (zilla) {
      queryObj = {
        ...queryObj,
        zilla: zilla,
      };
    }
    setQuery((prev) => {
      return {
        ...prev,
        ...queryObj,
      };
    });
  }, [division, setQuery, zilla]);
  return (
    <Accordion
      // open={open === 1}
      open={openAccordions["1"]}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            open === 1 ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0 " selected={openAccordions["3"]}>
        <AccordionHeader
          onClick={() => handleToggle(1)}
          className="p-3 border-b-0"
        >
          <Typography color="blue-gray" className="mr-auto font-normal">
            ঠিকানা
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <div>
          <p className="my-2 font-semibold text-left ">স্থায়ী ঠিকানা </p>
          <div className="lg:w-64 w-full">
            <div className="relative">
              <select
                id="select"
                name="select"
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
              >
                <option value="সকল">বিভাগ নির্বাচন করুন</option>
                <option value="পাত্রের">বরিশাল</option>
                <option value="পাত্রীর"> ঢাকা </option>
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
          <div className="lg:w-64 w-full my-5">
            <div className="relative">
              <select
                id="select১"
                name="select১"
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
              >
                <option value="সকল">জেলা নির্বাচন করুন</option>
                <option value="পাত্রের">বরিশাল</option>
                <option value="পাত্রীর"> ঢাকা </option>
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
        </div>

        <div>
          <p className="my-2 font-semibold text-left "> বর্তমান ঠিকানা </p>
          <div className="lg:w-64 w-full">
            <div className="relative">
              <select
                id="select"
                name="select"
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
              >
                <option value="সকল">বিভাগ নির্বাচন করুন</option>
                <option value="পাত্রের">বরিশাল</option>
                <option value="পাত্রীর"> ঢাকা </option>
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
          <div className="lg:w-64 w-full my-5">
            <div className="relative">
              <select
                id="select১"
                name="select১"
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none cursor-pointer hover:border-gray-500 focus:outline-none focus:shadow-outline"
              >
                <option value="সকল">জেলা নির্বাচন করুন</option>
                <option value="পাত্রের">বরিশাল</option>
                <option value="পাত্রীর"> ঢাকা </option>
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
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default AddressFilter;
