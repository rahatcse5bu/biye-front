import axios from '../utils/axios';

const getOngikarNamaByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(`/ongikar-nama/token`, {
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
  const { data } = await axios.put(`/ongikar-nama`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const createOngikarNama = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post('/ongikar-nama', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return generalInfo.data;
};

export const OngikarNamaServices = {
  getOngikarNamaByUser,
  updateOngikarNama,
  createOngikarNama,
};
