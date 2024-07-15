import axios from "axios";
import { convertToQuery } from "../utils/query";
import axiosInstance from "../utils/axios";
const baseUrl =
  import.meta.env.VITE_REACT_APP_NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://server.pnc-nikah.com/api/v1";

const getAllDivisions = async () => {
  const response = await axios.get("/divisions.json");
  //console.log(response);
  return response.data;
};

const getAllDistricts = async (division) => {
  const res1 = await axios.get("/divisions.json");
  const divisions = res1?.data;
  const resp2 = await axios.get("/districts.json");
  const districts = resp2?.data;
  if (!division) {
    return districts;
  }
  const findDivision = divisions?.find((d) => d.value === division);
  //console.log(findDivision);
  const divisionId = findDivision?.id;
  //console.log(divisionId);
  const filteredDistricts = districts?.filter(
    (d) => d.division_id === divisionId
  );
  //console.log(filteredDistricts);
  return filteredDistricts;
};

const getAllUpzilla = async (district) => {
  const res1 = await axios.get("/upzila.json");
  const upzillas = res1?.data;
  const resp2 = await axios.get("/districts.json");
  const districts = resp2?.data;
  if (!district) {
    return upzillas;
  }
  const findDistrict = districts?.find((d) => d.value === district);
  //console.log(findDistrict);
  const districtId = findDistrict?.id;
  //console.log(districtId);
  const filteredUpzillas = upzillas?.filter(
    (d) => d.district_id === districtId
  );
  //console.log(filteredUpzillas);
  return filteredUpzillas;
};

const getALLGeneralInfo = async (query) => {
  const queryString = convertToQuery(query);
  console.log(
    "🚀 ~ file: bioData.jsx:55 ~ getALLGeneralInfo ~ queryString:",
    queryString
  );

  const generalInfo = await axios.get(baseUrl + `/general-info?${queryString}`);
  return generalInfo.data;
};

const getBioData = async (id) => {
  const { data } = await axios.get(baseUrl + "/bio-data/" + Number(id));
  return data;
};

const createGeneralInfo = async (data, token) => {
  const generalInfo = await axios.post(baseUrl + "/general-info", data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  return generalInfo.data;
};

const getBioDataStatistics = async (id) => {
  if (!id) {
    return null;
  }
  const bioData = await axios.get(
    baseUrl + `/bio-choice-data/statistics/${id}`
  );
  return bioData.data;
};
const getAllBioDataStats = async () => {
  const bioData = await axiosInstance.get(`/bio-data/stats`);
  return bioData.data;
};

export const BioDataServices = {
  getALLGeneralInfo,
  getBioData,
  getAllDivisions,
  getAllDistricts,
  getAllUpzilla,
  createGeneralInfo,
  getBioDataStatistics,
  getAllBioDataStats,
};
