import axios from "axios";
import { baseUrl } from "../utils/url";
import { convertToQuery } from "../utils/query";

const getGeneralInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(baseUrl + `/general-info/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateGeneralInfo = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(baseUrl + `/general-info`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};
const updateWatchOfBioData = async (id) => {
  if (!id) {
    return null;
  }
  const { data } = await axios.get(baseUrl + `/general-info/watch/${id}`);
  return data;
};

const getALLGeneralInfo = async (query) => {
  console.log(query);
  const queryString = convertToQuery(query);
  // console.log(
  //   "🚀 ~ file: bioData.jsx:55 ~ getALLGeneralInfo ~ queryString:",
  //   queryString
  // );

  const generalInfo = await axios.get(baseUrl + `/general-info?${queryString}`);
  return generalInfo.data;
};

export const GeneralInfoServices = {
  getGeneralInfoByUser,
  updateGeneralInfo,
  updateWatchOfBioData,
  getALLGeneralInfo,
};
