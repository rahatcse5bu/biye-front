import axios from "axios";
import { baseUrl } from "../utils/url";

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

export const GeneralInfoServices = {
  getGeneralInfoByUser,
  updateGeneralInfo,
  updateWatchOfBioData,
};
