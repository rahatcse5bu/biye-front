import axios from '../utils/axios';

const getAddressInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(`/address/token`, {
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
  const { data } = await axios.put(`/address`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const createAddressInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post('/address', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return generalInfo.data;
};

export const AddressInfoServices = {
  getAddressInfoByUser,
  updateAddressInfo,
  createAddressInfo,
};
