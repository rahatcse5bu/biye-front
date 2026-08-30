import axios from '../utils/axios';

const createPayments = async (data, token) => {
  void token;
  const response = await axios.post('/payments', data);
  return response.data;
};

const getPaymentsByUser = async (token) => {
  if (!token) {
    return;
  }
  const response = await axios.get('/payments/token');
  return response.data;
};
const updatePaymentInfo = async (updatedData, token) => {
  if (!updatedData || !token) {
    return null;
  }
  const { data } = await axios.put('/payments', updatedData);
  return data;
};
export const paymentServices = {
  createPayments,
  getPaymentsByUser,
  updatePaymentInfo,
};
