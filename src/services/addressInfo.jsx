import axios from "axios";
import { baseUrl } from "../utils/url";

const getAddressInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(baseUrl + `/address/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateAddressInfo = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(baseUrl + `/address`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

const createAddressInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post(baseUrl + "/address", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return generalInfo.data;
};

export const AddressInfoServices = {
  getAddressInfoByUser,
  updateAddressInfo,
  createAddressInfo,
};
