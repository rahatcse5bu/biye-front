import axios from '../utils/axios';

const getMaritalInfoInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(`/marital-info/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateMaritalInfoInfo = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(`/marital-info`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const createMaritalInfoInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post('/marital-info', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return generalInfo.data;
};

export const MaritalInfoInfoServices = {
  getMaritalInfoInfoByUser,
  updateMaritalInfoInfo,
  createMaritalInfoInfo,
};
