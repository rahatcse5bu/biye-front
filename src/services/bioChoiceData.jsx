import axios from '../utils/axios';

const createBioChoiceData = async (data, token) => {
  if (!token) {
    return null;
  }
  const response = await axios.post('/bio-choice-data', data);
  return response.data;
};
const updateBioChoiceData = async (data, token, type = '') => {
  if (!token) {
    return null;
  }
  const response = await axios.put(`/bio-choice-data?type=${type}`, data);

  return response.data;
};
const getBioChoiceDataFirstStep = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/bio-choice-data/first-step');
  return response.data;
};
const getBioChoiceDataSecondStep = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/bio-choice-data/second-step');
  return response.data;
};
const checkBioChoiceDataSecondStep = async (bioId, token) => {
  if (!bioId || !token) {
    return null;
  }
  const response = await axios.get(
    `/bio-choice-data/check-second-step/${bioId}`
  );
  return response.data;
};
const checkBioChoiceDataFirstStep = async (bioId, token) => {
  if (!bioId || !token) {
    return null;
  }
  const response = await axios.get(
    `/bio-choice-data/check-first-step/${bioId}`
  );
  return response.data;
};
const getBioChoiceShare = async (token) => {
  if (!token) {
    return null;
  }
  const response = await axios.get('/bio-choice-data/bio-share');
  return response.data;
};

export const BioChoiceDataServices = {
  createBioChoiceData,
  getBioChoiceDataFirstStep,
  getBioChoiceDataSecondStep,
  checkBioChoiceDataSecondStep,
  checkBioChoiceDataFirstStep,
  getBioChoiceShare,
  updateBioChoiceData,
};
