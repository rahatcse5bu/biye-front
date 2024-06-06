import axios from "axios";
import { baseUrl } from "../utils/url";

const getExpectedPartnerByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(baseUrl + `/expected-life-partner/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateExpectedPartner = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(
    baseUrl + `/expected-life-partner`,
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

const createExpectedPartner = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post(
    baseUrl + "/expected-life-partner",
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

export const ExpectedPartnerServices = {
  getExpectedPartnerByUser,
  updateExpectedPartner,
  createExpectedPartner,
};
