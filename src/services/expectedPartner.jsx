import axios from '../utils/axios';

const getExpectedPartnerByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(`/expected-life-partner/token`, {
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
  const { data } = await axios.put(`/expected-life-partner`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const createExpectedPartner = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post('/expected-life-partner', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return generalInfo.data;
};

export const ExpectedPartnerServices = {
  getExpectedPartnerByUser,
  updateExpectedPartner,
  createExpectedPartner,
};
