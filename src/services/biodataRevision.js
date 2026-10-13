import axios from '../utils/axios';

const getMine = async () => {
  const response = await axios.get('/biodata-revisions/me');
  return response.data?.data;
};

const submit = async () => {
  const response = await axios.post('/biodata-revisions/me/submit');
  return response.data;
};

const withdraw = async () => {
  const response = await axios.delete('/biodata-revisions/me');
  return response.data;
};

export const BiodataRevisionServices = { getMine, submit, withdraw };
