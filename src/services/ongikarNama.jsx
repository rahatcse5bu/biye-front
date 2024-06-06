import axios from "axios";
import { baseUrl } from "../utils/url";

const getOngikarNamaByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(baseUrl + `/ongikar-nama/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateOngikarNama = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(baseUrl + `/ongikar-nama`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

const createOngikarNama = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post(baseUrl + "/ongikar-nama", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return generalInfo.data;
};

export const OngikarNamaServices = {
  getOngikarNamaByUser,
  updateOngikarNama,
  createOngikarNama,
};
