import axios from '../utils/axios';

const getFamilyStatusInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(`/family-status/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateFamilyStatusInfo = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(`/family-status`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const createFamilyStatusInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post('/family-status', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return generalInfo.data;
};

export const FamilyStatusInfoServices = {
  getFamilyStatusInfoByUser,
  updateFamilyStatusInfo,
  createFamilyStatusInfo,
};
