import axios from '../utils/axios';

const getEducationalQualificationInfoByUser = async (token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.get(`/educational-qualification/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const updateEducationalQualificationInfo = async (updatedData, token) => {
  if (!token) {
    return null;
  }
  const { data } = await axios.put(`/educational-qualification`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return data;
};

const createEducationalQualificationInfo = async (data, token) => {
  if (!token) {
    return null;
  }
  const generalInfo = await axios.post('/educational-qualification', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return generalInfo.data;
};

export const EducationalQualificationInfoServices = {
  getEducationalQualificationInfoByUser,
  updateEducationalQualificationInfo,
  createEducationalQualificationInfo,
};
