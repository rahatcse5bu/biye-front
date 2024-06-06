import axios from "axios";
import { baseUrl } from "../utils/url";

const getEducationalQualificationInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(
    baseUrl + `/educational-qualification/token`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const updateEducationalQualificationInfo = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(
    baseUrl + `/educational-qualification`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

const createEducationalQualificationInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post(
    baseUrl + "/educational-qualification",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return generalInfo.data;
};

export const EducationalQualificationInfoServices = {
  getEducationalQualificationInfoByUser,
  updateEducationalQualificationInfo,
  createEducationalQualificationInfo,
};
