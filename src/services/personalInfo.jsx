import axios from "axios";
import { baseUrl } from "../utils/url";

const getPersonalInfoInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(baseUrl + `/personal-info/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updatePersonalInfoInfo = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(baseUrl + `/personal-info`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

const createPersonalInfoInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post(baseUrl + "/personal-info", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return generalInfo.data;
};

export const PersonalInfoInfoServices = {
  getPersonalInfoInfoByUser,
  updatePersonalInfoInfo,
  createPersonalInfoInfo,
};
