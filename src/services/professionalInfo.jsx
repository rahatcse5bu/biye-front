import axios from "axios";
import { baseUrl } from "../utils/url";

const getProfessionalInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(baseUrl + `/occupation/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateProfessionalInfo = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(baseUrl + `/occupation`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

const createProfessionalInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post(baseUrl + "/occupation", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return generalInfo.data;
};

export const ProfessionalInfoServices = {
  getProfessionalInfoByUser,
  updateProfessionalInfo,
  createProfessionalInfo,
};
